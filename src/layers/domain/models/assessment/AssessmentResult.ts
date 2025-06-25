import { UserData } from "../auth/User"
import { Question } from "./QuestionAssessment"

export interface UserAnswer {
    questionId: number
    selectedAnswer: number
    isCorrect: boolean
    timeSpent: number
}

export interface AssessmentResult {
    user: UserData
    answers: UserAnswer[]
    totalTime: number
    completedAt: string
}

export interface ScoreData {
    correct: number
    total: number
    percentage: number
}

export interface AssessmentResultResponse {
    score: ScoreData,
    recommendation: string,
}

export interface Recommendation {
    title: string
    level: string
    description: string
    topics: string[]
    color: string
}
  
export interface GenerateReportParams {
    questions: Question[]
    userAnswers: UserAnswer[]
    timeSpent: number
    user: { fullName: string; email: string }
    recommendation: Recommendation
    score: number
    percentage: number
}
  