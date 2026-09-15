// ÄNDRA MAIL HÄR. Båda formulären (offert + kontakt) använder den här filen.
// Underscore-namnet gör att Netlify inte kör den som en egen funktion.
//
// To: kontakt@fputs.se (din inkorg)
// From: noreply@fputs.se (inte samma som To — annars går Svara till dig själv)
// Reply-To: kundens e-post när den finns

const CONTACT_EMAIL = "kontakt@fputs.se";
const FROM_EMAIL = "Forsbergs Fönsterputs <noreply@fputs.se>";

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

function htmlRow(label, value) {
  return `<p style="font-size:14px;line-height:1.5;margin:0 0 10px;color:#1a1a1a"><span style="color:#6b7280;font-weight:600">${label}: </span>${value}</p>`;
}

function filledRows(pairs) {
  return pairs.filter(([, v]) => {
    const s = String(v == null ? "" : v).trim();
    return s && s !== "0" && s !== "0 st" && s !== "Ej vald";
  });
}

function customerContactBanner(email, telefon) {
  const bits = [];
  let replyBtn = "";
  if (isValidEmail(email)) {
    const safe = escapeHtml(email.trim());
    bits.push(
      `E-post: <a href="mailto:${safe}" style="color:#16a34a;text-decoration:none">${safe}</a>`
    );
    replyBtn = `<p style="margin:12px 0 0"><a href="mailto:${safe}" style="display:inline-block;background-color:#16a34a;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 16px;border-radius:8px">Svara kunden</a></p>`;
  }
  const tel = String(telefon || "").trim();
  if (tel) {
    bits.push(
      `Telefon: <a href="tel:${escapeHtml(tel)}" style="color:#16a34a;text-decoration:none">${escapeHtml(tel)}</a>`
    );
  }
  if (!bits.length) return "";
  return `<div style="margin:0 0 20px;padding:12px 14px;background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;color:#14532d"><p style="font-size:14px;line-height:1.5;margin:0"><strong>Kundens kontakt:</strong> ${bits.join(" · ")}</p>${replyBtn}</div>`;
}

function buildText(title, pairs, email, telefon) {
  const lines = [title, ""];
  if (isValidEmail(email)) lines.push("Svara till: " + email.trim());
  if (telefon && String(telefon).trim()) lines.push("Telefon: " + String(telefon).trim());
  if (lines.length > 2) lines.push("");
  filledRows(pairs).forEach(([label, value]) => {
    lines.push(label + ": " + String(value).trim());
  });
  lines.push("", "Skickat från fputs.se till kontakt@fputs.se");
  return lines.join("\n");
}

async function sendToKontakt(apiKey, { subject, html, text, replyTo }) {
  const payload = {
    from: FROM_EMAIL,
    to: [CONTACT_EMAIL],
    subject,
    html,
    text,
  };
  if (isValidEmail(replyTo)) {
    payload.reply_to = replyTo.trim();
  }

  let lastStatus = 0;
  let lastText = "";
  for (let attempt = 1; attempt <= 2; attempt++) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) return res;
    lastStatus = res.status;
    lastText = await res.text();
    console.error("Resend error:", lastStatus, lastText, "attempt", attempt);
    if (lastStatus < 500 || attempt === 2) break;
  }

  const err = new Error("Kunde inte skicka mail");
  err.status = lastStatus;
  err.body = lastText;
  throw err;
}

module.exports = {
  CONTACT_EMAIL,
  FROM_EMAIL,
  escapeHtml,
  isValidEmail,
  htmlRow,
  filledRows,
  customerContactBanner,
  buildText,
  sendToKontakt,
};
