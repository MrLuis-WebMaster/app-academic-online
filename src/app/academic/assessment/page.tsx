"use client"

import { useAssessmentLogic } from "@/hooks/useAssessmentLogic"
import AssessmentHeader from "@/components/academic/assessment/AssessmentHeader"
import AssessmentProgress from "@/components/academic/assessment/AssessmentProgress"
import AssessmentQuestionCard from "@/components/academic/assessment/AssessmentQuestionCard"
import AssessmentResults from "@/components/academic/assessment/AssessmentResults"
import AssessmentLoader from "@/components/academic/assessment/AssessmentLoader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function AssessmentPage() {
    const {
        isLoading,
        showResults,
        isSubmitting,
        questions,
        currentQuestionIndex,
        selectedAnswer,
        handleAnswerSelect,
        handleNextQuestion,
        handlePreviousQuestion,
        timeSpent,
        isGeneratingPDF,
        generatePDF,
        resultAssessment
    } = useAssessmentLogic()

    if (isLoading) return <AssessmentLoader />

    if (showResults) {
        return (
            <AssessmentResults
                resultAssessment={resultAssessment}
                timeSpent={timeSpent}
                generatePDF={generatePDF}
                isGeneratingPDF={isGeneratingPDF}
            />
        )
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <AssessmentHeader timeSpent={timeSpent} />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <AssessmentProgress
                        current={currentQuestionIndex + 1}
                        total={questions.length}
                    />

                    <Card className="shadow-xl">
                        <CardContent className="p-8">
                            <AssessmentQuestionCard
                                question={currentQuestion}
                                selectedAnswer={selectedAnswer}
                                onSelectAnswer={handleAnswerSelect}
                            />

                            <div className="flex items-center justify-between mt-8 pt-6 border-t">
                                <Button
                                    variant="outline"
                                    onClick={handlePreviousQuestion}
                                    disabled={currentQuestionIndex === 0}
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Anterior
                                </Button>

                                <Button
                                    onClick={handleNextQuestion}
                                    disabled={selectedAnswer === null || isSubmitting}
                                    className="bg-orange-600 hover:bg-orange-700"
                                >
                                    {isSubmitting ? (
                                        <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full mr-2" />
                                    ) : null}
                                    {currentQuestionIndex === questions.length - 1
                                        ? "Finalizar"
                                        : "Siguiente"}
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
