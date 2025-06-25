import { NextRequest, NextResponse } from "next/server";
import { Login } from "@/layers/useCases/auth/LoginUseCase";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const useCase = new Login()
        const result = await useCase.execute(body)
        return NextResponse.json({ success: true, ...result })
    } catch  {
        return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
    }
}
