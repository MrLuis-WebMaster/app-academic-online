import { AssessmentResult, AssessmentResultResponse } from "@/layers/domain/models/assessment/AssessmentResult"
import { JsonAssessmentRepositoryImpl } from "@/layers/infrastructure/repositories/JsonAssessmentRepository"
import { calculateScore, getRecommendation } from "@/lib/utils/assessment"

export class SubmitAssessment {
    constructor(private repo = new JsonAssessmentRepositoryImpl()) { }

    async execute(result: AssessmentResult): Promise<AssessmentResultResponse> {
        const questionsList = await this.repo.getQuestions()
        const scoreData = calculateScore(result.answers, questionsList.questions)
        const recommendationObj = getRecommendation(scoreData.percentage)

        await this.repo.save(result)

        return {
            score: {
                correct: scoreData.score,
                total: questionsList.questions.length,
                percentage: scoreData.percentage,
            },
            recommendation: recommendationObj,
        }
    }
}
