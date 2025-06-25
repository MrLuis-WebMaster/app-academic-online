import { AssessmentResult, AssessmentResultResponse } from "@/layers/domain/models/assessment/AssessmentResult"
import { apiClient } from "./client"
import { QuestionList } from "@/layers/domain/models/assessment/QuestionAssessment"

export const submitAssessment = async (data: AssessmentResult) => {
    return apiClient.post<AssessmentResultResponse>("/assessment", data)
}

export const getQuestions = async () => {
    return apiClient.get<QuestionList>("/assessment/questions")
}
