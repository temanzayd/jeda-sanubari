export default async function handler(req, res) {
    // Set Header CORS agar bisa dipanggil dari frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { input } = req.body;
    const API_KEY = "AIzaSyDo2YUNhjKT2ZtyjYXEjPu0JLN1QIy-4FE";
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const promptBody = {
        contents: [{
            parts: [{
                text: `Berikan nasehat islami inklusif untuk masalah: "${input}". 
                WAJIB JSON MURNI:
                {
                    "summary": "Nasehat pembuka syahdu",
                    "quran": { "s": "nomor_surat", "a": "nomor_ayat", "name": "Nama Surat", "alasan": "Kaitan ayat" },
                    "sirah": { "tokoh": "Nama Sahabat/Rasul", "judul": "Judul Kisah", "narasi": "Narasi singkat kisah", "keyword": "Keyword Google" },
                    "asatidz": "Adi Hidayat/Salim A. Fillah/Hanan Attaki",
                    "kutipan": "Kutipan inspiratif",
                    "yt_query": "Kueri youtube"
                }`
            }]
        }],
        generationConfig: { response_mime_type: "application/json" }
    };

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(promptBody)
        });
        
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        res.status(200).json(JSON.parse(rawText));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
