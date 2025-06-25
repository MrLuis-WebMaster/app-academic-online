
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { LoginForm } from "@/components/auth/login/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-orange-600" />
                        <span className="text-2xl font-bold text-gray-900">EduPlatform</span>
                    </Link>
                    <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
                        Volver al inicio
                    </Link>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8 flex items-center justify-center">
                <Suspense fallback={<div>Cargando formulario...</div>}>
                    <LoginForm />
                </Suspense>
            </main>
        </div>
    );
}
