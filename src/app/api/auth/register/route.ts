import { NextRequest, NextResponse } from "next/server";
import { RegisterRequest } from "@/layers/domain/models/auth/Register";
import { Register } from "@/layers/useCases/auth/RegisterUseCase";

export async function POST(request: NextRequest) {
  try {
    await new Promise((res) => setTimeout(res, 1000));
    const body: RegisterRequest = await request.json();
    const useCase = new Register()
    useCase.execute(body);
    return NextResponse.json(
      { success: true, message: "Usuario registrado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en el registro:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
