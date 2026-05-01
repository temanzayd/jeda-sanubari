export default async function handler(req, res) {
  const { input } = req.body;
  const API_KEY = "AIzaSyDo2YUNhjKT2ZtyjYXEjPu0JLN1QIy-4FE"; // API Key Bapak

  const prompt = {
    contents: [{
      parts: [{
        text: `INPUT: "${input}". 
        TUGAS: Cari 1 Ayat Quran & 1 Kisah Sirah Sahabat/Rasul yang relevan secara SEMANTIK (Isi ayat harus nyambung dengan masalah hati user).
        FORMAT JSON KAKU:
        {
          "summary": "Nasehat syahdu pembuka yang inklusif",
          "quran": { "s": "no_surat", "a": "no_ayat", "name": "Nama Surat", "alasan": "Kaitan ayat ini dengan curhatan user" },
          "sirah": { "tokoh": "...", "judul": "...", "narasi": "...", "keyword": "Keyword Google" },
          "asatidz": "Adi Hidayat/Salim A. Fillah/Hanan Attaki",
          "kutipan": "Kutipan inspiratif asatidz",
          "yt_query": "Kueri YouTube"
        }`
      }]
    }]
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompt)
    });

    const data = await response.json();
    const textResponse = data.candidates[0].content.parts[0].text;
    const cleanJson = JSON.parse(textResponse.replace(/```json|```/g, ""));
    
    res.status(200).json(cleanJson);
  } catch (error) {
    res.status(500).json({ error: "Gagal memproses Sanad" });
  }
}
