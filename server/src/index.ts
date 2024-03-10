import { Request, Response } from 'express'
import { addQuiz, getAllQuiz, getQuizById } from './db/quiz'
import { Quiz, QuizWeb } from './types'

const express = require('express')
const app = express()

app.get('/', (_: Request, res: Response) => {
    res.send('hello')
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})



