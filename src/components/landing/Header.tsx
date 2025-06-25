"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAcademicUser } from "@/hooks/useAcademicUser"
import { BookOpen, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Header() {
    const { user } = useAcademicUser()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="md:hidden mt-4 space-y-4">
                    <Link href="#cursos" className="block text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                        Cursos
                    </Link>
                    <Link href="#sobre-nosotros" className="block text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                        Sobre Nosotros
                    </Link>
                    <Link href="#contacto" className="block text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                        Contacto
                    </Link>
                    {user ? (
                        <Link href="/academic" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full text-orange-600 border-orange-600">
                                Ir a mi espacio académico
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" className="w-full text-orange-600 border-orange-600">
                                Iniciar Sesión
                            </Button>
                        </Link>
                    )}
                </div>
            )}
        </header>
    )
}
