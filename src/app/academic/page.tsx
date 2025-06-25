"use client"

import { useAcademicUser } from "@/hooks/useAcademicUser"
import { Button } from "@/components/ui/button"

import {
    BookOpen,
    Award,
    Clock,
    TrendingUp,
} from "lucide-react"
import Link from "next/link"
import StatCard from "@/components/academic/StatCard"
import CourseProgress from "@/components/academic/CourseProgress"
import Sidebar from "@/components/academic/Sidebar"

export default function AcademicPage() {
    const { user,  } = useAcademicUser()
    if (!user) return null
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        ¡Bienvenido de vuelta, {user.fullName.split(" ")[0]}!
                    </h1>
                    <p className="text-gray-600">
                        Continúa tu viaje de aprendizaje donde lo dejaste
                    </p>
                </div>

                <div className="mb-8">
                    <Link href="/academic/assessment">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                            <BookOpen className="h-4 w-4 mr-2" />
                            Realizar evaluacion
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <StatCard label="Cursos Completados" value="12" icon={<Award className="h-8 w-8 text-green-600" />} />
                    <StatCard label="Cursos en Progreso" value="3" icon={<BookOpen className="h-8 w-8 text-orange-600" />} />
                    <StatCard label="Horas de Estudio" value="156" icon={<Clock className="h-8 w-8 text-blue-600" />} />
                    <StatCard label="Progreso General" value="78%" icon={<TrendingUp className="h-8 w-8 text-purple-600" />} />
                </div>

                <section className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <CourseProgress />
                    </div>
                    <Sidebar />
                </section>
            </main>
        </div>
    )
}


