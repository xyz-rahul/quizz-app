import z from 'zod'
import { QuizSchema } from './zodSchema'

export interface QuizDB {
    id: number
    title: string
    date: string
    questions: QuestionDB[]
}

export interface QuestionDB {
    id: number
    question_text: string
    quiz_id: number
    answers: AnswerDB[]
}
export interface AnswerDB {
    id: number
    answer_text: string
    is_correct: boolean | 0 | 1
    question_id: number
}
export type QuizWeb = {
    title: string
    difficulty: string
    description: string
    questions: {
        question_text: string
        answers: {
            answer_text: string
            is_correct: boolean
        }[]
    }[]
}

export type Answer = {
    id: string | number
    answer_text: string
    is_correct: boolean
}

export type Question = {
    questionId: string | number
    question_text: string
    correct_answer_id: string
    answers: Answer[]
}

export type Quiz = z.input<typeof QuizSchema>
