import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

// 1. Ambil API Key secara eksplisit dari Environment Variables
const ZAI_API_KEY = process.env.ZAI_API_KEY

const STUNTING_KNOWLEDGE_BASE = `
Informasi Penting tentang Stunting:

DEFINISI STUNTING:
Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, terutama pada 1000 hari pertama kehidupan (dari konsepsi hingga anak berusia 2 tahun). Anak dengan stunting memiliki tinggi badan lebih pendek dari standar usianya.

// ... (Konten STUNTING_KNOWLEDGE_BASE tetap sama)

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

    // 2. Tambahkan pemeriksaan API Key sebelum inisialisasi
    if (!ZAI_API_KEY) {
      console.error("ZAI_API_KEY is not set in Vercel Environment Variables.")
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          response: 'Maaf, sistem tidak terkonfigurasi dengan benar (API Key hilang).'
        },
        { status: 500 }
      )
    }

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // 3. Inisialisasi ZAI dengan API Key yang diambil
    const zai = await ZAI.create({ apiKey: ZAI_API_KEY })

    const systemPrompt = `Anda adalah asisten virtual ahli dalam bidang literasi pencegahan stunting untuk remaja SMA. 
// ... (System Prompt tetap sama)
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
    // 4. Perbarui pesan error untuk memberikan petunjuk yang lebih baik
    return NextResponse.json(
      { 
        error: 'External API or Timeout Error',
        response: 'Maaf, terjadi masalah saat menghubungi server Chatbot. Pastikan domain Vercel sudah terdaftar di Dashboard ZAI Anda.'
      },
      { status: 500 }
    )
  }
}
