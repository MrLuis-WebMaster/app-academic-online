import { AuthRepositoryImpl } from "@/layers/infrastructure/repositories/AuthRepository";


export class Logout {
    constructor(private repo = new AuthRepositoryImpl()) { }

    async execute(): Promise<void> {
        await this.repo.logout()
    }
}
