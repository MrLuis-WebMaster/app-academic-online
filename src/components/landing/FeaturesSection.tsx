import { Award, BookOpen, Users } from "lucide-react"
import { Card, CardContent } from "../ui/card"

export default function FeaturesSections() {
    return (

        <section className="container px-4 py-16 bg-white/50 backdrop-blur-sm rounded-3xl mx-auto mb-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir EduPlatform?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Ofrecemos la mejor experiencia de aprendizaje online con herramientas innovadoras
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8 text-center">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="h-8 w-8 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Cursos Especializados</h3>
                        <p className="text-gray-600">Contenido creado por expertos de la industria con casos prácticos reales</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8 text-center">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Comunidad Activa</h3>
                        <p className="text-gray-600">Conecta con otros estudiantes y mentores en nuestra comunidad global</p>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8 text-center">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Award className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Certificaciones</h3>
                        <p className="text-gray-600">Obtén certificados reconocidos por la industria al completar tus cursos</p>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}
