import React from "react"
import { Progress } from "@/components/ui/progress"

interface AssessmentProgressProps {
    current: number
    total: number
}

export default function AssessmentProgress({ current, total }: AssessmentProgressProps) {
    const progressValue = (current / total) * 100

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                    Pregunta {current} de {total}
                </span>
                <span className="text-sm font-medium text-gray-700">
                    {Math.round(progressValue)}% completado
                </span>
            </div>
            <Progress value={progressValue} className="h-2" />
        </div>
    )
}
