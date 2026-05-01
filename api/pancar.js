export default async function handler(req, res) {
    // Header untuk keamanan dan CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }
    
    const { input } = req.body;
    
    // Mengambil API Key dari Environment Variable yang sudah Bapak set di Settings Vercel
    const API_KEY = process.env.GEMINI_API_KEY; 
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const promptBody = {
        contents: [{
            parts: [{
                text: `Tugas: Berikan nasehat islami yang menyejukkan untuk masalah berikut: "${input}".
                
                WAJIB berikan respon dalam format JSON murni sebagai berikut:
                {
                    "summary": "Nasehat pembuka yang syahdu dan empati",
                    "quran": { 
                        "s": "nomor_surat", 
                        "a": "nomor_ayat", 
                        "name": "Nama Surat", 
                        "alasan": "Mengapa ayat ini sangat relevan dengan masalah user" 
                    },
                    "sirah": { 
                        "tokoh": "Nama Nabi/Sahabat", 
                        "judul": "Judul Kisah", 
                        "narasi": "Ringkasan singkat kisah yang inspiratif", 
                        "keyword": "Kata kunci untuk cari di Google" 
                    },
                    "asatidz": "Nama Ustadz (Adi Hidayat/Salim A. Fillah/Hanan Attaki)",
                    "kutipan": "Kutipan atau quotes dari ustadz tersebut yang menguatkan hati",
                    "yt_query": "Kata kunci pencarian youtube yang tepat"
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
        
        // Kirim hasil JSON kembali ke frontend
        res.status(200).json(JSON.parse(rawText));
        
    } catch (error) {
        res.status(500).json({ error: "Gagal memproses hikmah: " + error.message });
    }
}
