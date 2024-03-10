import { Request, Response } from 'express'
import { addQuiz, getAllQuiz, getQuizById } from './db/quiz'
import { Quiz, QuizWeb } from './types'
import QuizRoutes from './route/quiz'
import bodyParser from 'body-parser'

const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use('/quiz', QuizRoutes)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})
