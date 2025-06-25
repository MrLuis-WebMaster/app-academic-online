
import { BookOpen } from "lucide-react"

interface LoaderScreenProps {
    message?: string
}

export default function LoaderScreen({ message = "Cargando..." }: LoaderScreenProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
            <div className="text-center">
                <BookOpen className="h-12 w-12 text-orange-600 animate-pulse mx-auto mb-4" />
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    )
}
