// Netlify Function: tar emot det generella kontaktformuläret (kontakta-mig.html)
// och skickar mailet via Resend. Ingen npm-dependency (fetch är inbyggt i Node 18+ runtime).

const TEMPLATE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="sv"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/><meta name="x-apple-disable-message-reformatting"/></head><body style="background-color:#f4f4f5;margin:0;padding:0"><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0" data-skip-in-text="true">Nytt meddelande från %%NAMN%%</div><table border="0" width="100%" cellPadding="0" cellSpacing="0" role="presentation" align="center"><tbody><tr><td style="background-color:#f4f4f5;font-family:Montserrat, Arial, sans-serif;margin:0;padding:24px 0"><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:560px;background-color:#ffffff;border-radius:12px;padding:32px"><tbody><tr style="width:100%"><td><img src="https://fputs.se/images/logo-nav-badge.png" alt="Forsbergs Fönsterputs" width="170" height="40" style="display:block;margin:0 auto 20px;border:0;outline:none;text-decoration:none;height:40px;width:auto;max-width:200px"/><table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border-bottom:3px solid #16a34a;padding-bottom:16px;margin-bottom:20px"><tbody><tr><td><h1 style="font-size:20px;margin:0;color:#111827">Nytt meddelande via kontaktformuläret</h1><p style="font-size:13px;line-height:24px;margin:4px 0 0;color:#6b7280">Forsbergs Fönsterputs – fputs.se</p></td></tr></tbody></table>%%BANNER%%%%ROWS%%<hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin:24px 0;border-color:#e5e7eb"/><p style="font-size:12px;line-height:24px;color:#9ca3af;margin:0">Skickat automatiskt från kontaktformuläret på <a href="https://fputs.se" style="color:#16a34a;text-decoration-line:none" target="_blank">fputs.se</a></p></td></tr></tbody></table></td></tr></tbody></table></body></html>`;

const ROW = (label, value) =>
  `<p style="font-size:14px;line-height:1.5;margin:0 0 10px;color:#1a1a1a"><span style="color:#6b7280;font-weight:600">${label}: </span>${value}</p>`;

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function pickReplyTo(customerEmail, fallback) {
  const email = String(customerEmail || "").trim();
  return isValidEmail(email) ? email : fallback;
}

function customerReplyBanner(email) {
  if (isValidEmail(email)) {
    const safeEmail = escapeHtml(email.trim());
    return `<p style="font-size:14px;line-height:1.5;margin:0 0 20px;padding:12px 14px;background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#14532d"><strong>Svara kunden:</strong> tryck Svara i din e-post, eller skriv till <a href="mailto:${safeEmail}" style="color:#16a34a;text-decoration:none">${safeEmail}</a>.</p>`;
  }
  return `<p style="font-size:14px;line-height:1.5;margin:0 0 20px;padding:12px 14px;background-color:#fff7ed;border:1px solid #fed7aa;border-radius:8px;color:#9a3412"><strong>Ingen e-post angiven.</strong> Tryck inte Svara i mailet – då går svaret till formuläradressen.</p>`;
}

function buildHtml(fields) {
  const rows = [
    ["Ämne", fields.amne],
    ["Namn", fields.namn],
    ["E-post", fields.epost],
    ["Meddelande", fields.meddelande],
  ]
    .filter(([, v]) => v && String(v).trim())
    .map(([label, v]) => ROW(label, escapeHtml(v)))
    .join("");

  return TEMPLATE.replace("%%NAMN%%", escapeHtml(fields.namn))
    .replace("%%BANNER%%", customerReplyBanner(fields.epost))
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

  const TO_EMAIL = process.env.LEAD_TO_EMAIL || "kontakt@fputs.se";
  const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || "Fputs.se <formular@fputs.se>";

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        // Reply-To måste vara en adress som Loopia kan leverera till.
        // formular@fputs.se är bara Resend-avsändare och finns inte som brevlåda
        // (SMTP 550 "User unknown in relay recipient table" om man trycker Svara).
        reply_to: pickReplyTo(fields.epost, TO_EMAIL),
        subject: `Nytt meddelande – ${fields.namn}`,
        html: buildHtml(fields),
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", resendRes.status, errText);
      return { statusCode: 502, headers, body: JSON.stringify({ error: "Kunde inte skicka mail" }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("send-contact exception:", err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Serverfel" }) };
  }
};
