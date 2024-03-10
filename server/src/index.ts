import QuizRoutes from './route/quiz'
import bodyParser from 'body-parser'

const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use('/quiz', QuizRoutes)

const PORT = process.env.PORT
if (!PORT) throw new Error(`port not defined`)
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})
