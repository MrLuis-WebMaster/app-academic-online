import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    BookOpen,
    Settings,
    Award,
    TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Achievement from "./Achievement"

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
export default Sidebar