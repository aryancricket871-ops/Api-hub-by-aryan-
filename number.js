export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  const { number } = req.query;
  const key = req.query.key || req.query.slug || null;

  if (!number) {
    return res.status(400).json({
      status: "error",
      message: "number parameter required",
      developer: "Aryan",
      youtube: "https://youtube.com/@cyberlearners_aryan?si=YlC6CjEDcl_nRWAEe"
    });
  }

  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "key required",
      developer: "aryan",
      youtube: "https://youtube.com/@cyberlearners_aryan?si=YlC6CjEDcl_nRWAE"
    });
  }

  if (!key.startsWith('ADITYA-')) {
    return res.status(401).json({
      status: "error",
      message: "invalid key",
      developer: "aryan"
    });
  }

  try {
    const upstream = await fetch(
      `https://numberinfo-api-adibhai.vercel.app/api/number?number=${encodeURIComponent(number)}`
    );
    const data = await upstream.json();

    return res.status(200).json({
      status: data.status || "success",
      number: data.number || number,
      data: data.data || null,
      developer: "aryan",
      youtube: "https://youtube.com/@cyberlearners_aryan?si=YlC6CjEDcl_nRWAE"
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "upstream fetch failed",
      developer: "Aryan",
      youtube: "https://youtube.com/@cyberlearners_aryan?si=YlC6CjEDcl_nRWAE"
    });
  }
}
