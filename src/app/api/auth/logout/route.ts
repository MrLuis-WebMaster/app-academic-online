import { Logout } from "@/layers/useCases/auth/LogoutUseCase";
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const useCase = new Logout()
        await useCase.execute()
        return NextResponse.json({ success: true })
    } catch  {
        return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
    }
}
