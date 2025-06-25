"use client"

import { useAcademicUser } from "@/hooks/useAcademicUser"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    BookOpen,
    User,
    LogOut,
    Settings,
    Award,
    Clock,
    TrendingUp,
} from "lucide-react"
import LoaderScreen from "@/components/common/LoaderScreen"
import Link from "next/link"

export default function AcademicPage() {
    const { user, isLoading, logout } = useAcademicUser()

    if (isLoading) return <LoaderScreen message="Cargando tu espacio académico..." />
    if (!user) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BookOpen className="h-8 w-8 text-orange-600" />
                        <span className="text-2xl font-bold text-gray-900">EduPlatform</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-gray-600" />
                            <span className="text-gray-700">{user.fullName}</span>
                            {user.role === "admin" && (
                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                                    Admin
                                </span>
                            )}
                        </div>
                        <Button variant="outline" size="sm" onClick={logout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </header>

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

const StatCard = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                {icon}
            </div>
        </CardContent>
    </Card>
)

const CourseProgress = () => (
    <Card>
        <CardHeader>
            <CardTitle>Continúa Aprendiendo</CardTitle>
            <CardDescription>Tus cursos en progreso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {[
                { title: "Desarrollo Web con React", progress: 65 },
                { title: "Python para Data Science", progress: 40 },
                { title: "Diseño UX/UI Avanzado", progress: 25 },
            ].map((course) => (
                <div key={course.title} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{course.title}</h4>
                        <span className="text-sm text-gray-500">{course.progress}% completado</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Continuar Curso
                    </Button>
                </div>
            ))}
        </CardContent>
    </Card>
)

const Sidebar = () => (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explorar Cursos
                </Button>
                <Button className="w-full justify-start" variant="outline">
                    <Award className="h-4 w-4 mr-2" />
                    Mis Certificados
                </Button>
                <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configuración
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Logros Recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <Achievement
                    icon={<Award className="h-4 w-4 text-green-600" />}
                    title="Curso Completado"
                    subtitle="JavaScript Fundamentals"
                />
                <Achievement
                    icon={<TrendingUp className="h-4 w-4 text-blue-600" />}
                    title="Racha de 7 días"
                    subtitle="¡Sigue así!"
                />
            </CardContent>
        </Card>
    </div>
)

const Achievement = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) => (
    <div className="flex items-center space-x-3">
        <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
        <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
    </div>
)
