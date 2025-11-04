'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb,
  Heart,
  Apple,
  Brain,
  Users,
  Shield,
  ChevronRight,
  Star,
  MessageCircle
} from 'lucide-react'

interface Tip {
  id: number
  category: string
  title: string
  content: string
  icon: React.ReactNode
  color: string
  actionItems: string[]
}

const tips: Tip[] = [
  {
    id: 1,
    category: "Gizi Seimbang",
    title: "Menu Sehat untuk Remaja",
    content: "Sebagai calon orang tua, remaja perlu membiasakan pola makan seimbang. Konsumsi berbagai warna sayur dan buah, protein hewani dan nabati, serta karbohidrat kompleks.",
    icon: <Apple className="w-5 h-5" />,
    color: "bg-green-100 text-green-800",
    actionItems: [
      "Sarapan lengkap setiap hari",
      "Konsumsi 2 porsi sayur dan 2 porsi buah",
      "Cukupi kebutuhan protein 50-60g/hari",
      "Minum air putih 8 gelas sehari"
    ]
  },
  {
    id: 2,
    category: "Kesehatan Reproduksi",
    title: "Persiapan Menjadi Orang Tua",
    content: "Kesehatan reproduksi remaja menentukan kualitas generasi berikutnya. Mulai peduli dengan kesehatan tubuh dan hindari perilaku berisiko.",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-red-100 text-red-800",
    actionItems: [
      "Periksakan kesehatan rutin 6 bulan sekali",
      "Konsumsi asam folat untuk remaja putri",
      "Olahraga teratur 3x seminggu",
      "Hindari rokok dan alkohol"
    ]
  },
  {
    id: 3,
    category: "Edukasi",
    title: "Belajar tentang Stunting",
    content: "Pengetahuan adalah kunci pencegahan. Pelajari tentang gizi, tumbuh kembang anak, dan cara memberikan stimulasi yang tepat.",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-800",
    actionItems: [
      "Ikuti seminar kesehatan di sekolah",
      "Baca buku tentang parenting",
      "Gabung komunitas calon orang tua",
      "Follow akun edukasi kesehatan"
    ]
  },
  {
    id: 4,
    category: "Sosial",
    title: "Menjadi Agen Perubahan",
    content: "Remaja memiliki kekuatan untuk mengubah persepsi dan perilaku masyarakat. Sebarkan informasi positif tentang pencegahan stunting.",
    icon: <Users className="w-5 h-5" />,
    color: "bg-purple-100 text-purple-800",
    actionItems: [
      "Edukasi teman sebaya tentang stunting",
      "Buat konten edukasi di media sosial",
      "Ikut program kerelawanan",
      "Jadi contoh pola hidup sehat"
    ]
  },
  {
    id: 5,
    category: "Perlindungan Diri",
    title: "Cegah Stunting Sejak Dini",
    content: "Pencegahan stunting dimulai dari kesehatan calon orang tua. Jaga kesehatan sekarang untuk generasi yang lebih baik di masa depan.",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-orange-100 text-orange-800",
    actionItems: [
      "Jaga imunitas dengan vitamin",
      "Cukupi tidur 8 jam/hari",
      "Kelola stres dengan baik",
      "Lakukan medical check-up rutin"
    ]
  }
]

export default function InteractiveTips() {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null)
  const [completedTips, setCompletedTips] = useState<number[]>([])

  const handleCompleteTip = (tipId: number) => {
    if (completedTips.includes(tipId)) {
      setCompletedTips(completedTips.filter(id => id !== tipId))
    } else {
      setCompletedTips([...completedTips, tipId])
    }
  }

  const getCompletionRate = () => {
    return (completedTips.length / tips.length) * 100
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Tips Interaktif untuk Remaja SMA
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Lakukan aksi nyata untuk mencegah stunting. Setiap tips yang kamu pelajari 
          membawa dampak positif untuk masa depan generasi Indonesia.
        </p>
        
        {/* Progress */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Progress Tips</span>
            <span>{completedTips.length}/{tips.length} selesai</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getCompletionRate()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <Card 
            key={tip.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTip?.id === tip.id ? 'ring-2 ring-blue-500' : ''
            } ${completedTips.includes(tip.id) ? 'bg-green-50 border-green-200' : ''}`}
            onClick={() => setSelectedTip(selectedTip?.id === tip.id ? null : tip)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className={tip.color}>
                  {tip.icon}
                  <span className="ml-1">{tip.category}</span>
                </Badge>
                {completedTips.includes(tip.id) && (
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                )}
              </div>
              <CardTitle className="text-lg flex items-center gap-2">
                {tip.title}
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  selectedTip?.id === tip.id ? 'rotate-90' : ''
                }`} />
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{tip.content}</p>
              
              {selectedTip?.id === tip.id && (
                <div className="space-y-3 mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-sm">Aksi yang bisa dilakukan:</h4>
                  <ul className="space-y-2">
                    {tip.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCompleteTip(tip.id)
                    }}
                    variant={completedTips.includes(tip.id) ? "outline" : "default"}
                  >
                    {completedTips.includes(tip.id) ? (
                      <>
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        Tandai Belum Selesai
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Tandai Selesai
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Section */}
      {getCompletionRate() === 100 && (
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300">
          <CardContent className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-orange-800 mb-2">
              Selamat! Kamu Hebat!
            </h3>
            <p className="text-orange-700">
              Kamu telah menyelesaikan semua tips pencegahan stunting. 
              Terus bagikan pengetahuan ini ke teman-temanmu ya!
            </p>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-bold mb-4">Bagikan Pengetahuanmu</h3>
          <p className="text-gray-600 mb-6">
            Ajak teman-temanmu untuk belajar tentang pencegahan stunting bersama. 
            Semakin banyak yang tahu, semakin besar dampaknya!
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Undang Teman
            </Button>
            <Button>
              <MessageCircle className="w-4 h-4 mr-2" />
              Tanya Ahli
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}