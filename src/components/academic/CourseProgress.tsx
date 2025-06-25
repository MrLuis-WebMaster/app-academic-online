import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"


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

export default CourseProgress