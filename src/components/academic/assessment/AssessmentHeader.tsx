import React from "react"
import Link from "next/link"
import { BookOpen, Clock } from "lucide-react"

interface AssessmentHeaderProps {
    timeSpent: number
}

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
}

export default function AssessmentHeader({ timeSpent }: AssessmentHeaderProps) {
    return (
        <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <BookOpen className="h-8 w-8 text-orange-600" />
                    <span className="text-2xl font-bold text-gray-900">EduPlatform</span>
                </Link>

                <div className="flex items-center space-x-4 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono">{formatTime(timeSpent)}</span>
                </div>
            </nav>
        </header>
    )
}
