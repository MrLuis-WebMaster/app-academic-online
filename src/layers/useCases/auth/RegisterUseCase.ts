import { RegisterRequest } from "@/layers/domain/models/auth/Register"
import { AuthRepositoryImpl } from "@/layers/infrastructure/repositories/AuthRepository"

export class Register {
    constructor(private repo = new AuthRepositoryImpl()) { }

    async execute(data: RegisterRequest): Promise<void> {
        await this.repo.register(data)
    }
}