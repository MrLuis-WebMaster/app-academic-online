import { NextRequest, NextResponse } from "next/server"
import { AssessmentResult } from "@/layers/domain/models/assessment/AssessmentResult"
import { SubmitAssessment } from "@/layers/useCases/assessment/SubmitAssessmentUseCase"

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as AssessmentResult

        const useCase = new SubmitAssessment()
        const result = await useCase.execute(body)

        return NextResponse.json({ success: true, ...result })
    } catch (err) {
        console.error("Error submitting assessment:", err)
        return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 })
    }
}
