import { useEffect, useRef, useState } from "react"
import { generateAssessmentReport } from "@/lib/utils/assessment"
import { useAcademicUser } from "./useAcademicUser"
import { Question } from "@/layers/domain/models/assessment/QuestionAssessment"
import { AssessmentResultResponse, UserAnswer } from "@/layers/domain/models/assessment/AssessmentResult"
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
    const [resultAssessment, setResultAssessment] = useState<AssessmentResultResponse>({} as AssessmentResultResponse)   
    const { user } = useAcademicUser()

    const timerRef = useRef<NodeJS.Timeout | null>(null)


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
        timerRef.current = setInterval(() => {
            setTimeSpent((prev) => prev + 1)
        }, 1000)

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
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
        stopTimer()
        try {
            if (!user) {
                throw new Error("User data is missing.");
            }
            const data = await submitAssessment({
                answers,
                totalTime: timeSpent,
                user: user,
                completedAt: new Date().toISOString(),
            })
            setResultAssessment(data)
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

            await generateAssessmentReport({
                user: userData,
                resultAssessment,
                questions,
                timeSpent,
            })
        } catch (err) {
            console.error("Error generating PDF:", err)
            alert("No se pudo generar el PDF.")
        } finally {
            setIsGeneratingPDF(false)
        }
    }

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
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
        generatePDF,
        resultAssessment
    }
}
