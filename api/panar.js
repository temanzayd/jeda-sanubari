export default async function handler(req, res) {
    // Handling CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { input } = req.body;
    
    // Memanggil API Key dari Environment Variable Vercel
    const API_KEY = process.env.GEMINI_API_KEY; 
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const promptBody = {
        contents: [{
            parts: [{
                text: `Berikan nasehat islami inklusif untuk: "${input}". 
                WAJIB OUTPUT JSON MURNI:
                {
                    "summary": "Nasehat pembuka syahdu",
                    "quran": { "s": "no_surat", "a": "no_ayat", "name": "Nama Surat", "alasan": "Alasan ayat" },
                    "sirah": { "tokoh": "...", "judul": "...", "narasi": "...", "keyword": "Keyword Google" },
                    "asatidz": "Adi Hidayat/Salim A. Fillah/Hanan Attaki",
                    "kutipan": "Kutipan inspiratif",
                    "yt_query": "Kueri youtube"
                }`
            }]
        }],
        generationConfig: { 
            response_mime_type: "application/json",
            temperature: 0.7 
        }
    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(promptBody)
        });
        
        const data = await response.json();
        
        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const rawText = data.candidates[0].content.parts[0].text;
        res.status(200).json(JSON.parse(rawText));
    } catch (error) {
        res.status(500).json({ error: "Gagal memproses hikmah." });
    }
}
