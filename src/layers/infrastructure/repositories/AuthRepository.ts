import { promises as fs } from "fs"
import path from "path"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { User } from "@/layers/domain/entities/User"
import { LoginFormData } from "@/layers/domain/models/auth/Login"
import { RegisterRequest } from "@/layers/domain/models/auth/Register"
import { validateEmail } from "@/lib/validators/userValidator"

const DATA_PATH = path.join(process.cwd(), "src/data/users.json")
const JWT_SECRET = process.env.JWT_SECRET || "EDU_SECRET_DEV"

export class AuthRepositoryImpl {
    async login(data: LoginFormData): Promise<Omit<User, "password">> {
        const { email, password } = data

        if (!email || !password) throw new Error("Email y contraseña requeridos")

        const users: User[] = JSON.parse(await fs.readFile(DATA_PATH, "utf-8"))
        const user = users.find((u) => u.email === email.toLowerCase())

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error("Credenciales inválidas")
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: "student",
            },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        (await cookies()).set("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userSafe } = user;
        return userSafe;
    }

    async register(data: RegisterRequest): Promise<void> {
        const { fullName, email, password, acceptTerms } = data
        const errors: Record<string, string> = {}

        if (!fullName || fullName.trim().length < 2)
            errors.fullName = "El nombre debe tener al menos 2 caracteres"

        if (!email || !validateEmail(email))
            errors.email = "Correo electrónico inválido"

        if (!password || password.length < 6)
            errors.password = "La contraseña debe tener al menos 6 caracteres"

        if (!acceptTerms)
            errors.acceptTerms = "Debes aceptar los términos y condiciones"

        const raw = await fs.readFile(DATA_PATH, "utf-8")
        const users: User[] = JSON.parse(raw) ?? []

        if (users.some((u) => u.email === email.toLowerCase())) {
            errors.email = "Este correo ya está registrado"
        }

        if (Object.keys(errors).length > 0) {
            throw new Error("Validación fallida: " + JSON.stringify(errors))
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser: User = {
            id: crypto.randomUUID(),
            fullName: fullName.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        }

        users.push(newUser)
        await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2))
    }

    async logout(): Promise<void> {
        (await cookies()).set("authToken", "", {
            path: "/",
            expires: new Date(0),
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        })
    }
}
