import express, { Request, Response } from 'express'
import { getAllQuiz, getQuizById, addQuiz } from '../db/quiz'
import { QuizSchema } from '../zodSchema'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const quizList = await getAllQuiz()
        res.json(quizList)
    } catch (error) {
        console.error('Error retrieving quiz list:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const quiz = await getQuizById(parseInt(id))
        res.json(quiz)
    } catch (error) {
        console.error('Error retrieving quiz by ID:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

router.post('/', async (req: Request, res: Response) => {
    const quizData = req.body
    const quiz = QuizSchema.safeParse(quizData)
    if (quiz.success) {
        const quizId = await addQuiz(quiz.data)
        res.json(quizId)
        return
    } else {
        res.status(400).json(quiz.error.issues)
    }
})

export default router
