import { JsonAssessmentRepositoryImpl } from "@/layers/infrastructure/repositories/JsonAssessmentRepository"

export class GetQuestionsWithoutAnswersAssessmentUseCase {
    constructor(private repo = new JsonAssessmentRepositoryImpl()) { }

    async execute() {
        const data = await this.repo.getQuestionsWithoutAnswers()
        return data
    }
}
