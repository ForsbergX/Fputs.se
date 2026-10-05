// Netlify Function: priskalkylatorn på startsidan → Resend → kontakt@fputs.se
// Nås via /api/boka (se _redirects). Svarar i formatet kalkylatorn förväntar sig:
// { ok, reference, emailSent, manual, total, totalBeforeRut }.

const {
  escapeHtml,
  htmlRow,
  filledRows,
  customerContactBanner,
  buildText,
  sendToKontakt,
} = require("./_resend-mail");
// Samma regel för spärrade arbetshelger som kalendern i webbläsaren använder.
const { arSparrad } = require("../../js/arbetshelger.js");

const FREQUENCY = { engang: "En gång", 2: "2 ggr/år", 3: "3 ggr/år", 4: "4 ggr/år" };
const TIME = {
  morgon: "Morgon / förmiddag (07-10)",
  lunch: "Lunch / mitt på dagen (10-13)",
  fm: "Förmiddag (08-12)",
  em: "Eftermiddag (12-16)",
  flex: "Heldag / flexibel",
  kvall: "Kväll (efter 17)",
};

function kr(n) {
  const v = Number(n);
  return Number.isFinite(v) && v > 0 ? Math.round(v).toLocaleString("sv-SE") + " kr" : "";
}

function reference() {
  const d = new Date();
  const ymd = d.toISOString().slice(2, 10).replace(/-/g, "");
  return "FP-" + ymd + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

// Valfria bilder på glasen: max 5 st JPEG (komprimeras i webbläsaren), skickas som bilagor.
const MAX_BILDER = 5;
const MAX_BILD_BYTES = 1.5 * 1024 * 1024;

function bilagor(bilder) {
  if (!Array.isArray(bilder)) return [];
  return bilder
    .slice(0, MAX_BILDER)
    .filter((x) => x && typeof x.data === "string" && /^[A-Za-z0-9+/=]+$/.test(x.data))
    .filter((x) => x.data.length * 0.75 <= MAX_BILD_BYTES)
    .map((x, i) => ({
      filename: `bild-${i + 1}.jpg`,
      content: x.data,
    }));
}

function fieldPairs(b, ref) {
  const c = b.contact || {};
  const q = b.quote || {};
  const lines = Array.isArray(q.lines) ? q.lines.join(", ") : "";
  return [
    ["Referens", ref],
    ["Typ", q.manual ? "Prisförfrågan (offereras)" : "Bokning"],
    ["Namn", c.namn],
    ["Telefon", c.telefon],
    ["Adress", c.adress],
    ["E-post", c.email],
    ["Bostad", b.mode === "lagenhet" ? "Lägenhet" : "Villa/radhus"],
    ["Beställning", lines],
    ["Intervall", FREQUENCY[b.frequency] || b.frequency],
    ["Pris efter RUT", kr(q.total)],
    ["Framkörningsavgift", Number(q.fee) > 0 ? kr(q.fee) + " (ingår i priset, ger inte RUT-avdrag)" : ""],
    ["Pris före RUT", kr(q.totalBeforeRut)],
    ["Önskat datum 1", c.datum1],
    ["Önskat datum 2", c.datum2],
    ["Tid", TIME[c.tid] || c.tid],
    ["Meddelande", c.meddelande],
    ["Bilder", b.antalBilder ? `${b.antalBilder} bifogade` : ""],
  ];
}

function buildHtml(b, ref) {
  const rows = filledRows(fieldPairs(b, ref))
    .map(([label, v]) => htmlRow(label, escapeHtml(v)))
    .join("");
  const c = b.contact || {};
  return `<!DOCTYPE html><html lang="sv"><body style="background-color:#f4f4f5;margin:0;padding:24px 0;font-family:Montserrat, Arial, sans-serif"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px"><img src="https://fputs.se/images/logo-nav-badge.png" alt="Forsbergs Fönsterputs" height="40" style="display:block;margin:0 auto 20px;height:40px;width:auto"/><div style="border-bottom:3px solid #d1101f;padding-bottom:16px;margin-bottom:20px"><h1 style="font-size:20px;margin:0;color:#111827">Ny bokning från kalkylatorn</h1><p style="font-size:13px;margin:4px 0 0;color:#6b7280">${escapeHtml(ref)}</p></div>${customerContactBanner(c.email, c.telefon)}${rows}<p style="font-size:12px;color:#9ca3af;margin:24px 0 0">Skickat automatiskt från priskalkylatorn på fputs.se</p></div></body></html>`;
}

exports.handler = async function (event) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  const reply = (statusCode, body) => ({ statusCode, headers, body: JSON.stringify(body) });

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return reply(405, { ok: false, error: "Method Not Allowed" });

  let b;
  try {
    b = JSON.parse(event.body || "{}");
  } catch (e) {
    return reply(400, { ok: false, error: "Ogiltig data" });
  }

  // Honeypot: fältet "website" är dolt för människor.
  if (b.website) return reply(200, { ok: true, reference: reference(), emailSent: false });

  const c = b.contact || {};
  if (!c.namn || !c.telefon || !c.adress) {
    return reply(400, { ok: false, error: "Obligatoriska fält saknas" });
  }

  if ([c.datum1, c.datum2].some((d) => d && arSparrad(d))) {
    return reply(409, { ok: false, error: "Det valda datumet är inte tillgängligt. Välj en annan dag." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY saknas i miljövariabler");
    return reply(500, { ok: false, error: "Serverfel" });
  }

  const ref = reference();
  const q = b.quote || {};
  const attachments = bilagor(b.bilder);
  b.antalBilder = attachments.length;
  try {
    await sendToKontakt(apiKey, {
      subject: `${q.manual ? "Prisförfrågan" : "Bokning"} ${ref} – ${c.namn}`,
      html: buildHtml(b, ref),
      text: buildText("Ny bokning från kalkylatorn", fieldPairs(b, ref), c.email, c.telefon),
      replyTo: c.email,
      attachments,
    });
  } catch (err) {
    console.error("boka exception:", err);
    return reply(502, { ok: false, error: "Kunde inte skicka mail" });
  }

  // emailSent gäller bekräftelse till kunden, som inte skickas härifrån.
  return reply(200, {
    ok: true,
    reference: ref,
    emailSent: false,
    manual: !!q.manual,
    total: Number(q.total) || 0,
    totalBeforeRut: Number(q.totalBeforeRut) || 0,
  });
};
