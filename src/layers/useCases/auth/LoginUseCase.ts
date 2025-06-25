import { User } from "@/layers/domain/entities/User"
import { LoginFormData } from "@/layers/domain/models/auth/Login"
import { AuthRepositoryImpl } from "@/layers/infrastructure/repositories/AuthRepository"

export class Login {
    constructor(private repo = new AuthRepositoryImpl()) { }

    async execute(data: LoginFormData): Promise<Omit<User, "password">> {
        return await this.repo.login(data)
    }
}
