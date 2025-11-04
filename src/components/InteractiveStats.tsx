'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Baby,
  MapPin,
  Calendar
} from 'lucide-react'

interface StatData {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  description: string
  color: string
}

const provinceData = [
  { name: "Papua", rate: 37.5, trend: "down" },
  { name: "Nusa Tenggara Timur", rate: 32.4, trend: "down" },
  { name: "Maluku", rate: 28.9, trend: "down" },
  { name: "Gorontalo", rate: 27.8, trend: "stable" },
  { name: "Sulawesi Barat", rate: 26.7, trend: "down" }
]

export default function InteractiveStats() {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [animatedProgress, setAnimatedProgress] = useState(0)

  const nationalStats: StatData[] = [
    {
      title: "Prevalensi Stunting Nasional",
      value: "21.6%",
      change: -2.1,
      icon: <Baby className="w-5 h-5" />,
      description: "Penurunan dari 23.7% pada tahun 2022",
      color: "text-red-600"
    },
    {
      title: "Anak Terdampak",
      value: "4.7 Juta",
      change: -0.3,
      icon: <Users className="w-5 h-5" />,
      description: "Jumlah anak di bawah 5 tahun",
      color: "text-blue-600"
    },
    {
      title: "Target 2024",
      value: "14%",
      change: -7.6,
      icon: <TrendingDown className="w-5 h-5" />,
      description: "Target nasional pemerintah",
      color: "text-green-600"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(21.6)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* National Statistics */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">Statistik Stunting Indonesia</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {nationalStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <Badge 
                    variant={stat.change < 0 ? "default" : "destructive"}
                    className={stat.change < 0 ? "bg-green-100 text-green-800" : ""}
                  >
                    {stat.change > 0 ? "+" : ""}{stat.change}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <CardTitle className="text-3xl">{stat.value}</CardTitle>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progress Menuju Target 2024
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Current: 21.6%</span>
              <span>Target: 14%</span>
            </div>
            <Progress value={animatedProgress} className="h-4" />
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <div className="font-semibold text-red-600">2021</div>
                <div>24.4%</div>
              </div>
              <div>
                <div className="font-semibold text-orange-600">2022</div>
                <div>23.7%</div>
              </div>
              <div>
                <div className="font-semibold text-green-600">2023</div>
                <div>21.6%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Province Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            5 Provinsi dengan Prevalensi Tertinggi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {provinceData.map((province, index) => (
              <div
                key={province.name}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedProvince === province.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedProvince(
                  selectedProvince === province.name ? null : province.name
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-500">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-semibold">{province.name}</div>
                      <div className="text-sm text-gray-600">
                        {province.rate}% prevalensi stunting
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={province.trend === "down" ? "default" : "secondary"}
                      className={province.trend === "down" ? "bg-green-100 text-green-800" : ""}
                    >
                      {province.trend === "down" ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      )}
                      {province.trend === "down" ? "Menurun" : "Stabil"}
                    </Badge>
                  </div>
                </div>
                {selectedProvince === province.name && (
                  <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                    <p>
                      Provinsi {province.name} masih memerlukan intervensi intensif 
                      untuk menurunkan prevalensi stunting melalui program gizi, 
                      kesehatan, dan sanitasi yang terintegrasi.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Timeline Pencegahan Stunting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="w-0.5 h-16 bg-gray-300"></div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Sebelum Kehamilan</div>
                <div className="text-sm text-gray-600">
                  Persiapan nutrisi dan kesehatan untuk calon ibu
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="w-0.5 h-16 bg-gray-300"></div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Masa Kehamilan</div>
                <div className="text-sm text-gray-600">
                  Pemeriksaan rutin dan asupan gizi ibu hamil
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <div className="w-0.5 h-16 bg-gray-300"></div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">0-6 Bulan</div>
                <div className="text-sm text-gray-600">
                  ASI eksklusif dan stimulasi awal
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <div className="font-semibold">6-24 Bulan</div>
                <div className="text-sm text-gray-600">
                  MPASI bergizi dan monitoring pertumbuhan
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}