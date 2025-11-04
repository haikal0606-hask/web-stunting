'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Trophy,
  Brain,
  Heart,
  Apple,
  Users
} from 'lucide-react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Apa definisi stunting yang paling tepat?",
    options: [
      "Kondisi anak yang terlalu gemuk",
      "Kondisi gagal tumbuh akibat kekurangan gizi kronis",
      "Penyakit menular pada anak",
      "Kondisi anak yang terlalu pendek karena faktor genetik"
    ],
    correctAnswer: 1,
    explanation: "Stunting adalah kondisi gagal tumbuh pada anak akibat kekurangan gizi kronis, terutama pada 1000 hari pertama kehidupan.",
    category: "Definisi"
  },
  {
    id: 2,
    question: "Periode emas pencegahan stunting adalah?",
    options: [
      "Saat anak mulai sekolah",
      "1000 hari pertama kehidupan",
      "Masa remaja",
      "Saat dewasa"
    ],
    correctAnswer: 1,
    explanation: "1000 hari pertama kehidupan (dari konsepsi hingga anak usia 2 tahun) adalah periode krusial untuk pencegahan stunting.",
    category: "Waktu"
  },
  {
    id: 3,
    question: "Manakah yang BUKAN termasuk pencegahan stunting?",
    options: [
      "Memberikan ASI eksklusif",
      "Mengonsumsi makanan bergizi seimbang",
      "Memberikan makanan junk food",
      "Imunisasi lengkap"
    ],
    correctAnswer: 2,
    explanation: "Makanan junk food tidak membantu pencegahan stunting karena kurang nutrisi dan dapat mengganggu pertumbuhan anak.",
    category: "Pencegahan"
  },
  {
    id: 4,
    question: "Berapa persen prevalensi stunting di Indonesia saat ini?",
    options: [
      "5.6%",
      "12.3%",
      "21.6%",
      "35.2%"
    ],
    correctAnswer: 2,
    explanation: "Prevalensi stunting di Indonesia saat ini sekitar 21.6%, masih menjadi tantangan kesehatan nasional.",
    category: "Statistik"
  },
  {
    id: 5,
    question: "Apa peran remaja SMA dalam pencegahan stunting?",
    options: [
      "Tidak ada peran karena masih muda",
      "Hanya belajar di sekolah",
      "Sebagai calon orang tua dan agen perubahan",
      "Fokus pada prestasi akademik saja"
    ],
    correctAnswer: 2,
    explanation: "Remaja SMA memiliki peran ganda sebagai calon orang tua yang perlu mempersiapkan diri dan sebagai agen perubahan di masyarakat.",
    category: "Peran Remaja"
  },
  {
    id: 6,
    question: "Makanan mana yang paling baik untuk ibu hamil mencegah stunting?",
    options: [
      "Mi instan dan kopi",
      "Sayur hijau, protein, dan buah-buahan",
      "Makanan manis dan karbohidrat sederhana",
      "Makanan cepat saji"
    ],
    correctAnswer: 1,
    explanation: "Sayur hijau, protein hewani/nabati, dan buah-buahan memberikan nutrisi lengkap yang dibutuhkan untuk pertumbuhan janin.",
    category: "Gizi"
  },
  {
    id: 7,
    question: "Kapan waktu terbaik mulai memberikan MPASI?",
    options: [
      "Saat lahir",
      "3 bulan",
      "6 bulan",
      "12 bulan"
    ],
    correctAnswer: 2,
    explanation: "MPASI (Makanan Pendamping ASI) sebaiknya diberikan saat anak berusia 6 bulan dengan ASI tetap diberikan hingga 2 tahun.",
    category: "ASI & MPASI"
  },
  {
    id: 8,
    question: "Apa dampak jangka panjang stunting?",
    options: [
      "Anak menjadi lebih pintar",
      "Prestasi akademik dan produktivitas kerja menurun",
      "Tidak ada dampak sama sekali",
      "Anak menjadi lebih tinggi saat dewasa"
    ],
    correctAnswer: 1,
    explanation: "Stunting dapat menyebabkan prestasi akademik rendah dan produktivitas kerja menurun saat dewasa, menciptakan siklus kemiskinan.",
    category: "Dampak"
  }
]

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false))
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === quizQuestions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }

    const newAnsweredQuestions = [...answeredQuestions]
    newAnsweredQuestions[currentQuestion] = true
    setAnsweredQuestions(newAnsweredQuestions)
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false))
    setQuizCompleted(false)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Definisi":
        return <Brain className="w-4 h-4" />
      case "Gizi":
        return <Apple className="w-4 h-4" />
      case "Peran Remaja":
        return <Users className="w-4 h-4" />
      default:
        return <Heart className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Definisi":
        return "bg-blue-100 text-blue-800"
      case "Gizi":
        return "bg-green-100 text-green-800"
      case "Peran Remaja":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-orange-100 text-orange-800"
    }
  }

  if (quizCompleted) {
    const percentage = (score / quizQuestions.length) * 100
    let message = ""
    let emoji = ""

    if (percentage >= 80) {
      message = "Luar biasa! Anda sangat paham tentang stunting!"
      emoji = "🏆"
    } else if (percentage >= 60) {
      message = "Bagus! Anda sudah memahami dasar-dasar stunting."
      emoji = "🌟"
    } else {
      message = "Terus belajar! Penting untuk memahami pencegahan stunting."
      emoji = "📚"
    }

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{emoji}</div>
          <CardTitle className="text-2xl">Kuis Selesai!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-600">
              {score} / {quizQuestions.length}
            </div>
            <div className="text-lg text-gray-600">
              {percentage.toFixed(0)}% Benar
            </div>
          </div>
          
          <Progress value={percentage} className="h-3" />
          
          <Alert>
            <Trophy className="h-4 w-4" />
            <AlertDescription className="text-lg">
              {message}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h3 className="font-semibold">Ringkasan Jawaban:</h3>
            <div className="grid grid-cols-4 gap-2">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${
                    answeredQuestions[index]
                      ? index < quizQuestions.length - 1 || !quizCompleted
                        ? index === currentQuestion
                          ? 'bg-blue-500 text-white'
                          : 'bg-green-500 text-white'
                        : score === quizQuestions.length
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleRestartQuiz} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Mulai Ulang Kuis
          </Button>
        </CardContent>
      </Card>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge className={getCategoryColor(question.category)}>
            {getCategoryIcon(question.category)}
            <span className="ml-1">{question.category}</span>
          </Badge>
          <div className="text-sm text-gray-600">
            Pertanyaan {currentQuestion + 1} dari {quizQuestions.length}
          </div>
        </div>
        <Progress value={(currentQuestion / quizQuestions.length) * 100} className="mb-4" />
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctAnswer
            const showCorrect = showResult && isCorrect
            const showWrong = showResult && isSelected && !isCorrect

            return (
              <div
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected || showCorrect || showWrong
                        ? showCorrect
                          ? 'border-green-500 bg-green-500'
                          : showWrong
                          ? 'border-red-500 bg-red-500'
                          : 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {(isSelected || showCorrect || showWrong) && (
                        <span className="text-white text-sm">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </div>
                    <span className={`${showCorrect ? 'text-green-700 font-semibold' : showWrong ? 'text-red-700' : ''}`}>
                      {option}
                    </span>
                  </div>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </div>
            )
          })}
        </div>

        {showResult && (
          <Alert className={selectedAnswer === question.correctAnswer ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}>
            <AlertDescription>
              <strong>Penjelasan:</strong> {question.explanation}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          {!showResult ? (
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={selectedAnswer === null}
              className="flex-1"
            >
              Submit Jawaban
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="flex-1">
              {currentQuestion < quizQuestions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil'}
            </Button>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          <span>Skor: {score}</span>
          <span>{quizQuestions.length - currentQuestion - 1} pertanyaan tersisa</span>
        </div>
      </CardContent>
    </Card>
  )
}