import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    category: string
    difficulty: string
}

interface AssessmentQuestionCardProps {
    question: Question
    selectedAnswer: number | null
    onSelectAnswer: (index: number) => void
}

export default function AssessmentQuestionCard({
    question,
    selectedAnswer,
    onSelectAnswer,
}: AssessmentQuestionCardProps) {
    return (
        <Card className="shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            {question.category}
                        </span>
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                            {question.difficulty}
                        </span>
                    </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 leading-relaxed">
                    {question.question}
                </CardTitle>
            </CardHeader>

            <CardContent className="p-8">
                <RadioGroup
                    value={selectedAnswer?.toString()}
                    onValueChange={(value) => onSelectAnswer(Number.parseInt(value))}
                    className="space-y-4"
                >
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-gray-50 ${selectedAnswer === index ? "border-orange-500 bg-orange-50" : "border-gray-200"
                                }`}
                            onClick={() => onSelectAnswer(index)}
                        >
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`} className="flex-1 text-lg cursor-pointer">
                                {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    )
}
