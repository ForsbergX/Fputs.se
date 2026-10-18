// Netlify Function: upptagna tider i Tommys Google Kalender → bokningskalendern (js/kalender.js).
// Nås via /api/ledigt?from=ÅÅÅÅ-MM-DD&to=ÅÅÅÅ-MM-DD (se _redirects).
//
// Läser BARA ledig/upptagen (Google freeBusy) – vad som står i kalendern skickas aldrig vidare.
// Kräver miljövariabler i Netlify (guide: Desktop/Fputs.se/GOOGLE-KALENDER.md):
//   GOOGLE_CLIENT_EMAIL  servicekontots e-post (…@….iam.gserviceaccount.com)
//   GOOGLE_PRIVATE_KEY   servicekontots privata nyckel (hela "-----BEGIN PRIVATE KEY----- …")
//   GOOGLE_CALENDAR_ID   kalenderns id (oftast din gmail-adress)
// Saknas de svarar funktionen med en tom lista, så kalendern fungerar ändå (utan Google).

const crypto = require("crypto");

const DATUM = /^\d{4}-\d{2}-\d{2}$/;

function base64url(input) {
  return Buffer.from(input).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function accessToken(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const signature = crypto.createSign("RSA-SHA256").update(header + "." + claims).sign(privateKey);
  const jwt = header + "." + claims + "." + base64url(signature);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  if (!res.ok) throw new Error("Google token " + res.status + ": " + (await res.text()));
  return (await res.json()).access_token;
}

// Svensk tidszon för ett datum: "+01:00" vintertid, "+02:00" sommartid
function stockholmOffset(datum) {
  const del = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Stockholm", timeZoneName: "longOffset" })
    .formatToParts(new Date(datum + "T12:00:00Z"))
    .find((p) => p.type === "timeZoneName");
  return (del && del.value.replace("GMT", "")) || "+01:00";
}

function svar(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  if (!DATUM.test(q.from || "") || !DATUM.test(q.to || "")) return svar(400, { error: "from/to saknas" });

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!clientEmail || !privateKey || !calendarId) return svar(200, { busy: [], google: false });

  try {
    const token = await accessToken(clientEmail, privateKey);
    // Datumen tolkas i svensk tid (Europe/Stockholm), med sommar-/vintertid
    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({
        timeMin: q.from + "T00:00:00" + stockholmOffset(q.from),
        timeMax: q.to + "T23:59:59" + stockholmOffset(q.to),
        timeZone: "Europe/Stockholm",
        items: [{ id: calendarId }],
      }),
    });
    if (!res.ok) throw new Error("Google freeBusy " + res.status + ": " + (await res.text()));
    const data = await res.json();
    const cal = (data.calendars || {})[calendarId] || {};
    if (cal.errors && cal.errors.length) throw new Error("Kalenderfel: " + JSON.stringify(cal.errors));
    return svar(200, { busy: (cal.busy || []).map((b) => ({ start: b.start, end: b.end })), google: true });
  } catch (err) {
    console.error("ledigt:", err.message);
    return svar(200, { busy: [], google: false, error: "Kunde inte läsa kalendern" });
  }
};
