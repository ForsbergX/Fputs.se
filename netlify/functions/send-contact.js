// Netlify Function: kontaktformuläret → Resend → kontakt@fputs.se
// Ingen npm-dependency (fetch är inbyggt i Node 18+ runtime).

const {
  escapeHtml,
  htmlRow,
  filledRows,
  customerContactBanner,
  buildText,
  sendToKontakt,
} = require("../lib/resend-mail");

const TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="sv"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/></head><body style="background-color:#f4f4f5;margin:0;padding:0"><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">Nytt meddelande från %%NAMN%%</div><table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" align="center"><tbody><tr><td style="background-color:#f4f4f5;font-family:Montserrat, Arial, sans-serif;margin:0;padding:24px 0"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:560px;background-color:#ffffff;border-radius:12px;padding:32px"><tbody><tr style="width:100%"><td><img src="https://fputs.se/images/logo-nav-badge.png" alt="Forsbergs Fönsterputs" width="170" height="40" style="display:block;margin:0 auto 20px;border:0;outline:none;text-decoration:none;height:40px;width:auto;max-width:200px"/><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border-bottom:3px solid #16a34a;padding-bottom:16px;margin-bottom:20px"><tbody><tr><td><h1 style="font-size:20px;margin:0;color:#111827">Nytt meddelande via kontaktformuläret</h1><p style="font-size:13px;line-height:24px;margin:4px 0 0;color:#6b7280">Forsbergs Fönsterputs – fputs.se</p></td></tr></tbody></table>%%BANNER%%%%ROWS%%<hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:24px 0;border-color:#e5e7eb"/><p style="font-size:12px;line-height:24px;color:#9ca3af;margin:0">Skickat automatiskt från kontaktformuläret på <a href="https://fputs.se" style="color:#16a34a;text-decoration-line:none" target="_blank">fputs.se</a> till kontakt@fputs.se</p></td></tr></tbody></table></td></tr></tbody></table></body></html>`;

function fieldPairs(fields) {
  return [
    ["Ämne", fields.amne],
    ["Namn", fields.namn],
    ["E-post", fields.epost],
    ["Meddelande", fields.meddelande],
  ];
}

function buildHtml(fields) {
  const rows = filledRows(fieldPairs(fields))
    .map(([label, v]) => htmlRow(label, escapeHtml(v)))
    .join("");

  return TEMPLATE.replace("%%NAMN%%", escapeHtml(fields.namn))
    .replace("%%BANNER%%", customerContactBanner(fields.epost, fields.telefon))
    .replace("%%ROWS%%", rows);
}

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method Not Allowed" };
  }

  let fields;
  try {
    fields = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Ogiltig data" }) };
  }

  if (!fields.namn || !fields.epost || !fields.meddelande) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Obligatoriska fält saknas" }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY saknas i miljövariabler");
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Serverfel" }) };
  }

  try {
    await sendToKontakt(apiKey, {
      subject: `Nytt meddelande – ${fields.namn}`,
      html: buildHtml(fields),
      text: buildText("Nytt meddelande", fieldPairs(fields), fields.epost, fields.telefon),
    });
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("send-contact exception:", err);
    return { statusCode: 502, headers, body: JSON.stringify({ error: "Kunde inte skicka mail" }) };
  }
};
