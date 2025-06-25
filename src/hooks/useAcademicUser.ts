"use client"

import { UserData } from "@/layers/domain/models/auth/User"
import { logoutServer } from "@/lib/api/auth"
import { useEffect, useState } from "react"


export function useAcademicUser() {
    const [user, setUser] = useState<UserData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const userData = localStorage.getItem("user")

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData)
                setUser(parsedUser)
            } catch {
                localStorage.removeItem("user")
            }
        }

        setIsLoading(false)
    }, [])

    const logout = async () => {
        localStorage.removeItem("user")
        await logoutServer()
        window.location.href = "/"
    }

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
    }
}
