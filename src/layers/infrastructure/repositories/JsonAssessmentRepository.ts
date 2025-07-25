import path from "path"
import { promises as fs } from "fs"
import { AssessmentResult } from "@/layers/domain/models/assessment/AssessmentResult"
import { QuestionList, QuestionListWithoutAnswers } from "@/layers/domain/models/assessment/QuestionAssessment"


export class JsonAssessmentRepositoryImpl {
    async save(result: AssessmentResult): Promise<void> {
        const filePath = path.join(process.cwd(), "src/data/assessments.json");
        const file = await fs.readFile(filePath, "utf-8")
        const assessments: AssessmentResult[] = JSON.parse(file)
        assessments.push(result)
        await fs.writeFile(filePath, JSON.stringify(assessments, null, 2), "utf-8")
    }
    async getQuestions(): Promise<QuestionList> {
        const filePath = path.join(process.cwd(), "src/data/questions.json");
        const file = await fs.readFile(filePath, "utf-8")
        const data = JSON.parse(file) as QuestionList
        return data
    }
    async getQuestionsWithoutAnswers(): Promise<QuestionListWithoutAnswers> {
        const filePath = path.join(process.cwd(), "src/data/questions.json");
        const file = await fs.readFile(filePath, "utf-8")
        const rawData = JSON.parse(file) as QuestionList
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sanitizedQuestions = rawData.questions.map(({ correctAnswer, ...rest }) => rest)
        return {
            questions: sanitizedQuestions,
        }
    }
}
