import { apiClient } from "./client"
import { RegisterRequest } from "@/layers/domain/models/auth/Register"
import { LoginFormData } from "@/layers/domain/models/auth/Login"
import { User } from "@/layers/domain/entities/User"

export const login = async (data: LoginFormData) => {
    return apiClient.post<User>("/auth/login", data)
}

export const register = async (data: RegisterRequest) => {
    return apiClient.post("/auth/register", data)
}

export const logoutServer = async () => {
    return apiClient.get("/auth/logout")
}
