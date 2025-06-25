import { useEffect, useState } from "react"
import { generateAssessmentReport, getRecommendation } from "@/lib/utils/assessment"
import { useAcademicUser } from "./useAcademicUser"
import { Question } from "@/layers/domain/models/assessment/QuestionAssessment"
import { UserAnswer } from "@/layers/domain/models/assessment/AssessmentResult"
import { getQuestions, submitAssessment } from "@/lib/api/assessment"

export function useAssessmentLogic() {

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
    const [timeSpent, setTimeSpent] = useState(0)
    const [questionStartTime, setQuestionStartTime] = useState(Date.now())
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
    const { user } = useAcademicUser()

    useEffect(() => {
        const loadQuestions = async () => {
            try {
                const data = await getQuestions()
                setQuestions(data.questions)
                setQuestionStartTime(Date.now())
            } catch (error) {
                console.error("Error loading questions:", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadQuestions()
    }, [])

    useEffect(() => {
        const timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000)
        return () => clearInterval(timer)
    }, [])

    const handleAnswerSelect = (index: number) => {
        setSelectedAnswer(index)
    }

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1)
            const previousAnswer = userAnswers[currentQuestionIndex - 1]
            setSelectedAnswer(previousAnswer?.selectedAnswer ?? null)
        }
    }

    const handleNextQuestion = () => {
        if (selectedAnswer === null) return
        const current = questions[currentQuestionIndex]
        const elapsed = Math.floor((Date.now() - questionStartTime) / 1000)

        const answer: UserAnswer = {
            questionId: current.id,
            selectedAnswer,
            isCorrect: selectedAnswer === current.correctAnswer,
            timeSpent: elapsed
        }

        const updatedAnswers = [...userAnswers, answer]
        setUserAnswers(updatedAnswers)

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
            setSelectedAnswer(null)
            setQuestionStartTime(Date.now())
        } else {
            finishAssessment(updatedAnswers)
        }
    }

    const finishAssessment = async (answers: UserAnswer[]) => {
        setIsSubmitting(true)
        try {
            if (!user) {
                throw new Error("User data is missing.");
            }
            await submitAssessment({
                answers,
                totalTime: timeSpent,
                user: user,
                completedAt: new Date().toISOString(),
            })
            setShowResults(true)
        } catch (error) {
            console.error("Error submitting:", error)
            alert("Error al enviar resultados")
        } finally {
            setIsSubmitting(false)
        }
    }

    const generatePDF = async () => {
        setIsGeneratingPDF(true)
        try {
            const userData = JSON.parse(localStorage.getItem("user") || "{}")
            const score = userAnswers.filter((a) => a.isCorrect).length
            const recommendation = getRecommendation(score)

            await generateAssessmentReport({
                user: userData,
                userAnswers,
                questions,
                timeSpent,
                recommendation,
                score,
                percentage: Math.round((score / questions.length) * 100),
            })
        } catch (err) {
            console.error("Error generating PDF:", err)
            alert("No se pudo generar el PDF.")
        } finally {
            setIsGeneratingPDF(false)
        }
    }

    return {
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
        userAnswers,
        isGeneratingPDF,
        generatePDF
    }
}
