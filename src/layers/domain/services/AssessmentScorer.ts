import { AssessmentResult } from "../models/assessment/AssessmentResult"

export class AssessmentScorer {
    static calculateScore(result: AssessmentResult) {
        const correct = result.answers.filter(a => a.isCorrect).length
        const total = result.answers.length
        const percentage = Math.round((correct / total) * 100)
        return { correct, total, percentage }
    }

    static getRecommendation(score: number): string {
        if (score <= 3) return "Curso Introductorio de HTML y CSS"
        if (score <= 7) return "Fundamentos de JavaScript"
        return "Curso Avanzado de React y APIs REST"
    }
}
