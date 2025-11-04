'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Baby, 
  Heart, 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertCircle,
  MessageCircle,
  Brain,
  Apple,
  Activity,
  Clock
} from 'lucide-react'
import ChatBot from '@/components/ChatBot'
import QuizSection from '@/components/QuizSection'
import InteractiveStats from '@/components/InteractiveStats'
import InteractiveTips from '@/components/InteractiveTips'

export default function StuntingLiteracyPage() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <Baby className="w-4 h-4 mr-2" />
                Generasi Bebas Stunting
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Literasi Pencegahan Stunting untuk Remaja SMA
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Mari bersama-sama memahami dan mencegah stunting sejak dini. 
                Remaja SMA memiliki peran penting dalam menciptakan generasi yang sehat dan cerdas.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-green-50"
                  onClick={() => setShowChat(true)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Tanya Ahli
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Mulai Belajar
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">21.6%</div>
                    <div className="text-sm">Prevalensi Stunting di Indonesia</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">1000 Hari</div>
                    <div className="text-sm">Masa Emas Pertumbuhan</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">Tentang Stunting</TabsTrigger>
            <TabsTrigger value="prevention">Pencegahan</TabsTrigger>
            <TabsTrigger value="quiz">Kuis Interaktif</TabsTrigger>
            <TabsTrigger value="resources">Sumber Belajar</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    Apa itu Stunting?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, 
                    terutama pada 1000 hari pertama kehidupan. Anak dengan stunting memiliki 
                    tinggi badan lebih pendek dari standar usianya.
                  </p>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Stunting tidak hanya memengaruhi tinggi badan, tetapi juga perkembangan 
                      otak dan kemampuan kognitif anak.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    Dampak Stunting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Kognitif:</strong> Kemampuan belajar dan daya ingat menurun
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Ekonomi:</strong> Produktivitas dewasa menurun
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Sosial:</strong> Percaya diri dan kemampuan bersosialisasi terbatas
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <strong>Kesehatan:</strong> Rentan terhadap penyakit
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="prevention" className="mt-8">
            <div className="space-y-8">
              <InteractiveTips />
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Apple className="w-5 h-5" />
                      Gizi Seimbang
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Asupan protein hewani dan nabati</li>
                      <li>• Sayur dan buah berwarna-warni</li>
                      <li>• Susu dan produk olahannya</li>
                      <li>• Hindari makanan junk food</li>
                      <li>• Cukup kebutuhan zat besi</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Activity className="w-5 h-5" />
                      Pola Hidup Sehat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Olahraga teratur 3x seminggu</li>
                      <li>• Cukup tidur 8 jam per hari</li>
                      <li>• Jaga kebersihan diri</li>
                      <li>• Kelola stres dengan baik</li>
                      <li>• Hindari rokok dan alkohol</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <Heart className="w-5 h-5" />
                      Deteksi Dini
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Rutin periksa ke posyandu</li>
                      <li>• Pantau pertumbuhan anak</li>
                      <li>• Imunisasi lengkap</li>
                      <li>• Konsultasi ke dokter</li>
                      <li>• Catat perkembangan anak</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-center">Peran Remaja dalam Pencegahan Stunting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Sebagai Calon Orang Tua
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Belajar tentang gizi seimbang sejak dini</li>
                        <li>• Menjaga kesehatan reproduksi</li>
                        <li>• Mempersiapkan diri menjadi orang tua yang bijak</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Sebagai Agen Perubahan
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Edukasi teman sebaya tentang stunting</li>
                        <li>• Ikut serta dalam kampanye kesehatan</li>
                        <li>• Menjadi contoh pola hidup sehat</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-8">
            <QuizSection />
          </TabsContent>

          <TabsContent value="resources" className="mt-8">
            <div className="space-y-8">
              <InteractiveStats />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">📚 Buku Panduan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Panduan lengkap untuk calon orang tua tentang pencegahan stunting
                    </p>
                    <Button variant="outline" size="sm">Download PDF</Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">🎥 Video Edukasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Seri video tentang nutrisi ibu hamil dan makanan pendamping ASI
                    </p>
                    <Button variant="outline" size="sm">Tonton Sekarang</Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">📱 Aplikasi Mobile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Aplikasi untuk memantau pertumbuhan dan perkembangan anak
                    </p>
                    <Button variant="outline" size="sm">Download App</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* ChatBot Component */}
      {showChat && <ChatBot onClose={() => setShowChat(false)} />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Tentang Program</h3>
              <p className="text-gray-400 text-sm">
                Website literasi stunting untuk remaja SMA sebagai bagian dari 
                program pencegahan stunting nasional.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <p className="text-gray-400 text-sm">
                Email: info@stuntingliterasi.id<br />
                Hotline: 0812-3456-7890
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Sumber</h3>
              <p className="text-gray-400 text-sm">
                Kementerian Kesehatan RI<br />
                WHO Indonesia<br />
                UNICEF Indonesia
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2024 Literasi Stunting. Semua hak dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}