export interface Question {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    category: string
    difficulty: "Básico" | "Intermedio" | "Avanzado" | string
}

export interface QuestionList {
    questions: Question[]
}
  
