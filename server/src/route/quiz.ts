import express, { Request, Response } from 'express'
import { getAllQuiz, getQuizById, addQuiz } from '../db/quiz'
import { QuizSchema } from '../zodSchema'
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    console.log('req recieved')
    const quizList = await getAllQuiz()
    res.json(quizList)
})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const quiz = await getQuizById(parseInt(id))
    res.json(quiz)
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
