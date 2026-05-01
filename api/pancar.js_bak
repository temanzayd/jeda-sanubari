export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { input } = req.body;
    const API_KEY = "AIzaSyDo2YUNhjKT2ZtyjYXEjPu0JLN1QIy-4FE";
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const prompt = {
        contents: [{
            parts: [{
                text: `Tugas: Berikan nasehat inklusif untuk curhatan: "${input}". 
                WAJIB OUTPUT JSON MURNI:
                {
                    "summary": "Nasehat pembuka syahdu",
                    "quran": { "s": "no_surat", "a": "no_ayat", "name": "Nama Surat", "alasan": "Kaitan ayat" },
                    "sirah": { "tokoh": "...", "judul": "...", "narasi": "...", "keyword": "Keyword Google" },
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
            body: JSON.stringify(prompt)
        });
        
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        
        // Membersihkan teks jika ada karakter aneh
        const cleanJson = JSON.parse(rawText.trim());
        res.status(200).json(cleanJson);
    } catch (error) {
        res.status(500).json({ error: "Gagal memproses data sanad." });
    }
}
