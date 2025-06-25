import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Star className="w-4 h-4 mr-2" />
                    Plataforma #1 en Educación Online
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Transforma tu futuro con
                    <span className="text-orange-600 block">EduPlatform</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                    Descubre miles de cursos en línea diseñados por expertos. Aprende a tu ritmo, obtén certificaciones
                    reconocidas y acelera tu carrera profesional.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link href="/academic/assessment">
                        <Button
                            size="lg"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Comenzar Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Registrarse Gratis
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600">
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Más de 10,000 estudiantes</span>
                    </div>
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>500+ cursos disponibles</span>
                    </div>
                    <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>Certificación oficial</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
