import { GenerateReportParams, UserAnswer } from "@/layers/domain/models/assessment/AssessmentResult"
import { Question } from "@/layers/domain/models/assessment/QuestionAssessment"
import jsPDF from "jspdf"
import { formatTime } from "./time"


export function calculateScore(answers: UserAnswer[], questions: Question[]) {
    const correctAnswers = answers.filter((a) => a.isCorrect).length
    const percentage = Math.round((correctAnswers / questions.length) * 100)
    return { score: correctAnswers, percentage }
}

export function getScoreMessage(percentage: number) {
    if (percentage >= 90) return "¡Excelente! Tienes un conocimiento sobresaliente."
    if (percentage >= 80) return "¡Muy bien! Tienes un buen dominio de los conceptos."
    if (percentage >= 70) return "Bien. Hay algunas áreas que puedes mejorar."
    if (percentage >= 60) return "Regular. Te recomendamos reforzar varios conceptos."
    return "Necesitas estudiar más. ¡No te desanimes!"
}
  
export function getRecommendation(score: number) {
    if (score <= 3) {
        return {
            title: "Curso Introductorio de HTML y CSS",
            level: "Principiante",
            description:
                "Te recomendamos comenzar con los fundamentos del desarrollo web: HTML y CSS.",
            topics: ["HTML básico", "CSS básico", "Responsive", "Buenas prácticas"],
            color: "red",
        }
    }

    if (score <= 7) {
        return {
            title: "Fundamentos de JavaScript",
            level: "Intermedio",
            description:
                "Tienes una base sólida. Es hora de aprender JS y dar interactividad a tus sitios.",
            topics: ["Variables", "DOM", "Eventos", "ES6+", "Async"],
            color: "yellow",
        }
    }

    return {
        title: "Curso Avanzado de React y APIs",
        level: "Avanzado",
        description:
            "Dominaste lo básico. Ahora puedes avanzar con React y APIs modernas.",
        topics: ["React", "Hooks", "APIs", "Routing", "Testing"],
        color: "green",
    }
}
  

export function getScoreColor(percentage: number): string {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
}
  
export async function generateAssessmentReport({
    questions,
    userAnswers,
    timeSpent,
    user,
    recommendation,
    score,
    percentage
}: GenerateReportParams) {
    const doc = new jsPDF()
    const now = new Date()

    const primaryColor: [number, number, number] = [255, 87, 34]
    const secondaryColor: [number, number, number] = [76, 175, 80]
    const textColor: [number, number, number] = [33, 33, 33]
    const lightGray: [number, number, number] = [245, 245, 245]

    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 40, "F")

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text("EduPlatform", 20, 25)

    doc.setFontSize(16)
    doc.setFont("helvetica", "normal")
    doc.text("Reporte de Assessment", 20, 35)

    doc.setTextColor(...textColor)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Estudiante: ${user.fullName}`, 20, 55)
    doc.text(`Email: ${user.email}`, 20, 65)
    doc.text(`Fecha: ${now.toLocaleDateString("es-ES")}`, 20, 75)
    doc.text(`Hora: ${now.toLocaleTimeString("es-ES")}`, 120, 75)

    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(1)
    doc.line(20, 85, 190, 85)

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Resultados del Assessment", 20, 100)

    const centerX = 105
    const centerY = 130
    const radius = 25

    doc.setFillColor(240, 240, 240)
    doc.circle(centerX, centerY, radius, "F")

    const progressAngle = (percentage / 100) * 360

    for (let i = 0; i < progressAngle; i += 5) {
        const angle1 = (i - 90) * (Math.PI / 180)
        const angle2 = (i + 5 - 90) * (Math.PI / 180)
        const x1 = centerX + (radius - 3) * Math.cos(angle1)
        const y1 = centerY + (radius - 3) * Math.sin(angle1)
        const x2 = centerX + radius * Math.cos(angle1)
        const y2 = centerY + radius * Math.sin(angle1)
        const x3 = centerX + radius * Math.cos(angle2)
        const y3 = centerY + radius * Math.sin(angle2)
        const x4 = centerX + (radius - 3) * Math.cos(angle2)
        const y4 = centerY + (radius - 3) * Math.sin(angle2)

        doc.setFillColor(...secondaryColor)
        doc.triangle(x1, y1, x2, y2, x3, y3, "F")
        doc.triangle(x1, y1, x3, y3, x4, y4, "F")
    }

    doc.setTextColor(...textColor)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    const scoreText = `${percentage}%`
    const scoreWidth = doc.getTextWidth(scoreText)
    doc.text(scoreText, centerX - scoreWidth / 2, centerY + 5)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Respuestas correctas: ${score}/${questions.length}`, 20, 170)
    doc.text(`Tiempo total: ${formatTime(timeSpent)}`, 20, 180)
    doc.text(`Promedio por pregunta: ${Math.round(timeSpent / questions.length)}s`, 20, 190)

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Análisis por Categoría", 20, 210)

    let yPos = 225
    const categories = Array.from(new Set(questions.map((q) => q.category)))
    categories.forEach((category) => {
        const categoryQuestions = questions.filter((q) => q.category === category)
        const categoryAnswers = userAnswers.filter((a) => categoryQuestions.some((q) => q.id === a.questionId))
        const categoryScore = categoryAnswers.filter((a) => a.isCorrect).length
        const categoryPercentage = Math.round((categoryScore / categoryQuestions.length) * 100)

        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.text(`${category}:`, 25, yPos)
        doc.text(`${categoryScore}/${categoryQuestions.length} (${categoryPercentage}%)`, 120, yPos)

        const barWidth = 50
        const barHeight = 4
        const barX = 140
        const barY = yPos - 2

        doc.setFillColor(220, 220, 220)
        doc.rect(barX, barY, barWidth, barHeight, "F")

        const progressWidth = (categoryPercentage / 100) * barWidth
        const barColor: [number, number, number] =
            categoryPercentage >= 70 ? [76, 175, 80] : categoryPercentage >= 50 ? [255, 193, 7] : [244, 67, 54]
        doc.setFillColor(...barColor)
        doc.rect(barX, barY, progressWidth, barHeight, "F")

        yPos += 15
    })

    doc.addPage()

    doc.setFillColor(...primaryColor)
    doc.rect(0, 0, 210, 30, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Recomendación Personalizada", 20, 20)

    doc.setTextColor(...textColor)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(recommendation.title, 20, 50)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`Nivel: ${recommendation.level}`, 20, 65)

    doc.setFontSize(11)
    const descriptionLines = doc.splitTextToSize(recommendation.description, 170)
    doc.text(descriptionLines, 20, 80)

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Lo que aprenderás:", 20, 120)

    doc.setFontSize(11)
    doc.setFont("helvetica", "normal")
    let topicY = 135
    recommendation.topics.forEach((topic) => {
        doc.text(`• ${topic}`, 25, topicY)
        topicY += 12
    })

    doc.setFillColor(...lightGray)
    doc.rect(20, 200, 170, 40, "F")
    doc.setFontSize(12)
    doc.setFont("helvetica", "italic")
    doc.text(getScoreMessage(percentage), 25, 215)
    doc.text("¡Continúa aprendiendo y alcanza tus metas!", 25, 230)

    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(128, 128, 128)
    doc.text("Generado por EduPlatform - Tu plataforma de aprendizaje online", 20, 280)
    doc.text(`Fecha de generación: ${now.toLocaleString("es-ES")}`, 20, 290)

    const fileName = `assessment-results-${user.fullName?.replace(/\s+/g, "-")}-${now.toISOString().split("T")[0]}.pdf`
    doc.save(fileName)
}
  