import { JsonAssessmentRepositoryImpl } from "@/layers/infrastructure/repositories/JsonAssessmentRepository"

export class GetQuestionsAssessment {
    constructor(private repo = new JsonAssessmentRepositoryImpl()) { }

    async execute() {
        const data = await this.repo.getQuestions()
        return data
    }
}
