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
      developer: "Naresh",
      github: "https://github.com/nn5568816-max/lookup0sint/tree/main"
    });
  }

  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "key required",
      developer: "Naresh",
      github: "https://github.com/nn5568816-max/lookup0sint/tree/main"
    });
  }

  if (!key.startsWith('NARESH-')) {
    return res.status(401).json({
      status: "error",
      message: "invalid key",
      developer: "Naresh"
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
      developer: "Naresh",
      github: "https://github.com/nn5568816-max/lookup0sint/tree/main"
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "upstream fetch failed",
      developer: "Naresh",
      github: "https://github.com/nn5568816-max/lookup0sint/tree/main"
    });
  }
}
