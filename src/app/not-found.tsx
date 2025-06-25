"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Home, ArrowLeft, Search, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-orange-600" />
                        <span className="text-2xl font-bold text-gray-900">EduPlatform</span>
                    </Link>
                    <Link href="/">
                        <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
                            <Home className="h-4 w-4 mr-2" />
                            Inicio
                        </Button>
                    </Link>
                </nav>
            </header>

            <div className="container mx-auto px-4 py-16 flex items-center justify-center">
                <Card className="w-full max-w-2xl shadow-xl text-center">
                    <CardContent className="p-12">
                        <div className="mb-8">
                            <div className="relative mx-auto w-64 h-64 mb-6">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-8xl font-bold text-orange-200 select-none">404</span>
                                </div>

                                <div className="absolute top-4 left-4 bg-orange-100 p-3 rounded-full animate-bounce">
                                    <BookOpen className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="absolute top-8 right-8 bg-red-100 p-2 rounded-full animate-pulse">
                                    <Search className="h-4 w-4 text-red-600" />
                                </div>
                                <div className="absolute bottom-12 left-8 bg-yellow-100 p-2 rounded-full animate-bounce delay-300">
                                    <HelpCircle className="h-4 w-4 text-yellow-600" />
                                </div>

                                <div className="absolute top-16 right-4 w-3 h-3 bg-orange-300 rounded-full animate-ping"></div>
                                <div className="absolute bottom-8 right-12 w-2 h-2 bg-red-300 rounded-full animate-ping delay-500"></div>
                                <div className="absolute bottom-16 left-16 w-4 h-4 bg-yellow-300 rounded-full animate-pulse delay-700"></div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">¡Oops! Página no encontrada</h1>
                            <p className="text-xl text-gray-600 mb-4">La página que estás buscando no existe o ha sido movida.</p>
                            <p className="text-gray-500">
                                No te preocupes, esto pasa hasta a los mejores estudiantes. Vamos a ayudarte a encontrar lo que
                                necesitas.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link href="/">
                                <Button
                                    size="lg"
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Home className="h-5 w-5 mr-2" />
                                    Volver al Inicio
                                </Button>
                            </Link>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => window.history.back()}
                                className="bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <ArrowLeft className="h-5 w-5 mr-2" />
                                Página Anterior
                            </Button>
                        </div>

                        <div className="border-t pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces útiles:</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Link
                                    href="/academic/assessment"
                                    className="p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group"
                                >
                                    <div className="text-center">
                                        <BookOpen className="h-6 w-6 mx-auto mb-2 text-gray-600 group-hover:text-orange-600" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Assessment</span>
                                    </div>
                                </Link>

                                <Link href="/auth/register" className="p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group">
                                    <div className="text-center">
                                        <div className="w-6 h-6 mx-auto mb-2 bg-gray-600 group-hover:bg-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-white font-bold">+</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Registro</span>
                                    </div>
                                </Link>

                                <Link href="/auth/login" className="p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group">
                                    <div className="text-center">
                                        <div className="w-6 h-6 mx-auto mb-2 bg-gray-600 group-hover:bg-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-white font-bold">→</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Login</span>
                                    </div>
                                </Link>

                                <Link
                                    href="/academic"
                                    className="p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group"
                                >
                                    <div className="text-center">
                                        <div className="w-6 h-6 mx-auto mb-2 bg-gray-600 group-hover:bg-orange-600 rounded-full flex items-center justify-center">
                                            <span className="text-xs text-white font-bold">⚡</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Dashboard</span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
                            <p className="text-sm text-orange-800">
                                <strong>¿Necesitas ayuda?</strong> Si crees que esto es un error,
                                <Link href="/contact" className="underline hover:no-underline ml-1">
                                    contáctanos
                                </Link>{" "}
                                y te ayudaremos a resolverlo.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
