import { GetQuestionsAssessment } from "@/layers/useCases/assessment/GetQuestionsAssessmentUseCase"
import { NextResponse } from "next/server"

export async function GET() {
    try {

        const useCase = new GetQuestionsAssessment()
        const result = await useCase.execute()

        return NextResponse.json({ success: true, ...result })
    } catch (err) {
        console.error("Error submitting assessment:", err)
        return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 })
    }
}
