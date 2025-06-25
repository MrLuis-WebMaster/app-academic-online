import React from "react"
import { Clock } from "lucide-react"
import { formatTime } from "@/lib/utils/time"

interface AssessmentHeaderProps {
    timeSpent: number
}

export default function AssessmentHeader({ timeSpent }: AssessmentHeaderProps) {
    return (
        <header className="container mx-auto px-4 py-2">
            <nav className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-gray-600 ml-auto">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono">{formatTime(timeSpent)}</span>
                </div>
            </nav>
        </header>
    )
}
