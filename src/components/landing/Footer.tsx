import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="container mx-auto px-4 py-12 border-t border-gray-200 mt-16">
            <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <BookOpen className="h-6 w-6 text-orange-600" />
                    <span className="text-xl font-bold text-gray-900">EduPlatform</span>
                </div>
                <p className="text-gray-600 mb-6">Transformando vidas a través de la educación online de calidad</p>
                <div className="flex justify-center space-x-6 text-sm text-gray-500">
                    <Link href="#" className="hover:text-orange-600 transition-colors">
                        Términos de Servicio
                    </Link>
                    <Link href="#" className="hover:text-orange-600 transition-colors">
                        Política de Privacidad
                    </Link>
                    <Link href="#" className="hover:text-orange-600 transition-colors">
                        Soporte
                    </Link>
                </div>
                <p className="text-gray-400 text-sm mt-6">© 2025 EduPlatform. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
