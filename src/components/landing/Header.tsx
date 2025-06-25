"use client"
import { Button } from "@/components/ui/button"
import { useAcademicUser } from "@/hooks/useAcademicUser"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function Header() {
    const { user } = useAcademicUser()
    return (
        <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <BookOpen className="h-8 w-8 text-orange-600" />
                    <span className="text-2xl font-bold text-gray-900">EduPlatform</span>
                </div>
                <div className="hidden md:flex items-center space-x-6">
                    <Link href="#cursos" className="text-gray-600 hover:text-orange-600 transition-colors">
                        Cursos
                    </Link>
                    <Link href="#sobre-nosotros" className="text-gray-600 hover:text-orange-600 transition-colors">
                        Sobre Nosotros
                    </Link>
                    <Link href="#contacto" className="text-gray-600 hover:text-orange-600 transition-colors">
                        Contacto
                    </Link>

                    {user ? (
                        <Link href="/academic">
                            <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                                Ir a mi espacio académico
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/auth/login">
                            <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                                Iniciar Sesión
                            </Button>
                        </Link>
                    )}

                </div>
            </nav>
        </header>
    )
}
