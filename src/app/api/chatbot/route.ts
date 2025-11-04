import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const STUNTING_KNOWLEDGE_BASE = `
Informasi Penting tentang Stunting:

DEFINISI STUNTING:
Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, terutama pada 1000 hari pertama kehidupan (dari konsepsi hingga anak berusia 2 tahun). Anak dengan stunting memiliki tinggi badan lebih pendek dari standar usianya.

PENYEBAB STUNTING:
1. Kekurangan gizi kronis pada ibu sebelum dan selama kehamilan
2. Asupan gizi tidak adekuat pada 1000 hari pertama kehidupan
3. Infeksi berulang pada anak
4. Sanitasi yang buruk dan akses air bersih terbatas
5. Pengetahuan orang tua tentang gizi yang kurang
6. Kemiskinan dan akses terbatas ke pelayanan kesehatan

GEJALA STUNTING:
- Tinggi badan anak jauh di bawah standar usianya
- Berat badan kurang sesuai tinggi badan
- Pertumbuhan otak terhambat
- Kemampuan kognitif menurun
- Sering sakit-sakitan
- Daya tahan tubuh lemah

DAMPAK JANGKA PANJANG:
- Prestasi akademik rendah
- Produktivitas kerja menurun saat dewasa
- Risiko penyakit kronis lebih tinggi
- Siklus kemiskinan antar generasi

PENCEGAHAN STUNTING:
1. Sebelum kehamilan:
   - Konsumsi makanan bergizi seimbang
   - Cukupi kebutuhan zat besi dan asam folat
   - Jaga berat badan ideal
   - Hindari rokok dan alkohol

2. Selama kehamilan:
   - Pemeriksaan kehamilan rutin
   - Konsumsi tablet tambah darah
   - Makan 4 sehat 5 sempurna
   - Cukupi kebutuhan protein, vitamin, dan mineral

3. Setelah melahirkan:
   - Beri ASI eksklusif 6 bulan
   - MPASI bergizi setelah 6 bulan
   - Imunisasi lengkap
   - Pantau pertumbuhan anak

4. Sanitasi dan kebersihan:
   - Cuci tangan dengan sabun
   - Gunakan air bersih
   - Jaga kebersihan lingkungan
   - Buang sampah pada tempatnya

PERAN REMAJA SMA:
1. Sebagai calon orang tua:
   - Belajar tentang gizi seimbang
   - Menjaga kesehatan reproduksi
   - Hindari perilaku berisiko
   - Persiapkan diri menjadi orang tua yang bijak

2. Sebagai agen perubahan:
   - Edukasi teman sebaya
   - Ikut kampanye kesehatan
   - Menjadi contoh pola hidup sehat
   - Bantu menyebarkan informasi

MAKANAN YANG BAIK UNTUK PENCEGAHAN STUNTING:
- Protein hewani: daging, ayam, ikan, telur, susu
- Protein nabati: tahu, tempe, kacang-kacangan
- Sayuran hijau: bayam, kangkung, brokoli
- Buah-buahan: jeruk, mangga, pisang, pepaya
- Karbohidrat kompleks: nasi merah, ubi, jagung
- Lemak sehat: alpukat, kacang almond, minyak zaitun

TANDA-TANDA PERTUMBUHAN ANAK NORMAL:
- Naik 3-5 kg per tahun pada usia sekolah
- Tinggi badan bertambah sesuai standar WHO
- Aktif dan ceria
- Tidak sering sakit
- Milestone perkembangan tercapai tepat waktu

KAPAN HARUS KE DOKTER:
- Anak tidak naik berat badan 2 bulan berturut-turut
- Nafsu makan sangat buruk
- Sering diare atau batuk pilek
- Terlihat lesu dan tidak aktif
- Pertumbuhan tidak sesuai usia

SUMBER INFORMASI TERPERCAYA:
- Kementerian Kesehatan RI
- WHO (World Health Organization)
- UNICEF
- Puskesmas terdekat
- Posyandu
- Dokter anak atau ahli gizi
`

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const zai = await ZAI.create()

    const systemPrompt = `Anda adalah asisten virtual ahli dalam bidang literasi pencegahan stunting untuk remaja SMA. 

Tugas Anda:
1. Jawab pertanyaan tentang stunting dengan informasi yang akurat dan mudah dipahami
2. Berikan edukasi tentang pencegahan stunting yang relevan untuk remaja SMA
3. Gunakan bahasa yang ramah, informatif, dan sesuai dengan pemahaman remaja
4. Fokus pada solusi dan tindakan preventif yang bisa dilakukan remaja
5. Sertakan referensi ke sumber informasi terpercaya jika perlu

Informasi Dasar yang Harus Diketahui:
${STUNTING_KNOWLEDGE_BASE}

Pedoman Respons:
- Jawab dengan singkat, jelas, dan informatif (maksimal 3-4 paragraf)
- Gunakan bahasa Indonesia yang baik dan mudah dimengerti
- Jika pertanyaan di luar topik stunting, arahkan kembali ke topik terkait
- Berikan saran untuk konsultasi ke profesional kesehatan jika diperlukan
- Selalu berikan informasi yang positif dan memberdayakan

Contoh respons yang baik:
"Stunting adalah kondisi gagal tumbuh akibat kekurangan gizi kronis. Untuk mencegahnya, remaja seperti kamu bisa mulai dengan menerapkan pola makan seimbang dan belajar tentang gizi sejak dini. Ini penting karena kamu adalah calon orang tua di masa depan!"`

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const response = completion.choices[0]?.message?.content || 
      'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini. Silakan coba lagi.'

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Chatbot API Error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        response: 'Maaf, terjadi gangguan pada sistem. Silakan coba lagi beberapa saat lagi atau hubungi hotline kami di 0812-3456-7890 untuk bantuan langsung.'
      },
      { status: 500 }
    )
  }
}