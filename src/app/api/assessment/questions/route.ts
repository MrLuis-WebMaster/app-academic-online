import { GetQuestionsWithoutAnswersAssessmentUseCase } from "@/layers/useCases/assessment/GetQuestionsWithoutAnswersAssessmentUseCase"
import { NextResponse } from "next/server"

export async function GET() {
    try {

        const useCase = new GetQuestionsWithoutAnswersAssessmentUseCase()
        const result = await useCase.execute()

        return NextResponse.json({ success: true, ...result })
    } catch (err) {
        console.error("Error submitting assessment:", err)
        return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 })
    }
}
