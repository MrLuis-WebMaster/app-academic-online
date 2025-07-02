"use client"

import { Award, BookOpen, CheckCircle, AlertCircle, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getScoreColor, getScoreMessage } from "@/lib/utils/assessment"
import { formatTime } from "@/lib/utils/time"
import { AssessmentResultResponse } from "@/layers/domain/models/assessment/AssessmentResult"

interface Props {
    resultAssessment: AssessmentResultResponse
    timeSpent: number
    generatePDF: () => void
    isGeneratingPDF: boolean
}

export default function AssessmentResults({ timeSpent, generatePDF, isGeneratingPDF, resultAssessment }: Props) {
    const { score: {correct, percentage, total}, recommendation } = resultAssessment

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <div className="container mx-auto px-4 py-8 flex items-center justify-center">
                <Card className="w-full max-w-2xl shadow-xl">
                    <CardHeader className="text-center">
                        <div className={`mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center ${percentage >= 70 ? "bg-green-100" : "bg-red-100"}`}>
                            {percentage >= 70 ? (
                                <CheckCircle className="h-10 w-10 text-green-600" />
                            ) : (
                                <AlertCircle className="h-10 w-10 text-red-600" />
                            )}
                        </div>
                        <CardTitle className="text-3xl font-bold text-gray-900">¡Assessment Completado!</CardTitle>
                        <CardDescription className="text-lg text-gray-600">Aquí están tus resultados</CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 space-y-8">
                        <div className="text-center">
                            <Button
                                onClick={generatePDF}
                                disabled={isGeneratingPDF}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {isGeneratingPDF ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Generando PDF...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-5 w-5 mr-2" />
                                        Descargar Reporte PDF
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="text-center">
                            <div className={`text-6xl font-bold mb-2 ${getScoreColor(percentage)}`}>{percentage}%</div>
                            <p className="text-xl text-gray-600 mb-4">{correct} de {total} respuestas correctas</p>
                            <p className="text-gray-700 text-lg">{getScoreMessage(percentage)}</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{formatTime(timeSpent)}</div>
                                <div className="text-sm text-gray-600">Tiempo Total</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{Math.round(timeSpent / total)}s</div>
                                <div className="text-sm text-gray-600">Promedio por Pregunta</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-gray-900">{total - correct}</div>
                                <div className="text-sm text-gray-600">Respuestas Incorrectas</div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <Award className="h-6 w-6 text-orange-600 mr-2" />
                                Recomendación Personalizada
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <div className={`bg-${recommendation.color}-100 p-2 rounded-full`}>
                                        <BookOpen className={`h-5 w-5 text-${recommendation.color}-600`} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Curso Recomendado: {recommendation.title}</h4>
                                        <p className="text-sm text-gray-600">Nivel: {recommendation.level}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{recommendation.description}</p>
                                <div className="bg-white p-4 rounded-lg border">
                                    <h5 className="font-medium text-gray-900 mb-2">Lo que aprenderás:</h5>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {recommendation.topics.map((topic: string, i: number) => (
                                            <li key={i}>• {topic}</li>
                                        ))}
                                    </ul>
                                </div>
                                <Button className={`w-full bg-${recommendation.color}-600 hover:bg-${recommendation.color}-700`}>
                                    Ver {recommendation.title}
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Link href="/academic">
                                <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                                    Academia
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={() => window.location.reload()} className="flex-1">
                                Repetir Assessment
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
