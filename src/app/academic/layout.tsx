"use client"
import { ReactNode } from "react"
import { BookOpen, User, LogOut } from "lucide-react"
import { useAcademicUser } from "@/hooks/useAcademicUser"
import { Button } from "@/components/ui/button"
import LoaderScreen from "@/components/common/LoaderScreen"

export default function AcademicLayout({ children }: { children: ReactNode }) {
    const { user, isLoading, logout } = useAcademicUser()

    if (isLoading) return <LoaderScreen message="Cargando tu espacio académico..." />
    if (!user) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <header className="bg-white shadow-sm border-b px-4 py-4">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-orange-600" />
                        <span className="text-2xl font-bold text-gray-900">EduPlatform</span>
                    </div>

                    <div className="flex flex-col items-end sm:flex-row sm:items-center sm:space-x-4 mt-2 sm:mt-0">
                        <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-gray-600" />
                            <span className="text-gray-700">{user.fullName}</span>
                            {user.role === "admin" && (
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                    Admin
                                </span>
                            )}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 sm:mt-0"
                            onClick={logout}
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    )
}
