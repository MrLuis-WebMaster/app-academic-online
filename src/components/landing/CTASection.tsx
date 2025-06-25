import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function CTASection() {
    return (
        <section className="container mx-auto px-4 py-16 text-center">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-12 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar tu transformación?</h2>
                <p className="text-xl mb-8 opacity-90">Únete a miles de estudiantes que ya están construyendo su futuro</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/academic/assessment">
                        <Button
                            size="lg"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Comenzar Assessment
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/academic">
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                        >
                            Ver Cursos Disponibles
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

    )
}
