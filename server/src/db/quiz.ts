import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { AnswerDB, QuestionDB, QuizDB, QuizWeb, Quiz } from '../types'

const connect = async () => {
    return await mysql.createConnection(process.env.DATABASE_URL!)
}

interface QuizRowDataPacket extends RowDataPacket, QuizDB {}
interface QuestionRowDataPacket extends RowDataPacket, QuestionDB {}
interface AnswerRowDataPacket extends RowDataPacket, AnswerDB {}

export async function getAllQuiz(page: number = 1, size: number = 8) {
    const connection = await connect()

    const [totalQuizCountRow] = await connection.query<RowDataPacket[]>(
        'select count(*) as total_records from quiz'
    )
    const { total_records } = totalQuizCountRow[0]
    const total_pages = Math.ceil(parseInt(total_records) / size)

    const query = `select id, title, difficulty, description from quiz limit ${size} offset ${(page - 1) * size}`
    const [quizList] = await connection.query<RowDataPacket[]>(query)
    return { total_pages, data: quizList }
}

export async function getQuizById(quizId: number) {
    const connection = await connect()
    const [quizResult] = await connection.query<QuizRowDataPacket[]>(
        `SELECT title, difficulty, description FROM quiz WHERE id = ?`,
        [quizId]
    )
    if (quizResult.length === 0) return null
    const quiz = quizResult[0]

    const [questionList] = await connection.query<QuestionRowDataPacket[]>(
        `SELECT id, question_text FROM question WHERE quiz_id = ?`,
        [quizId]
    )
    const resQuestion: any = []
    await Promise.all(
        questionList.map(async function (question) {
            const [answerList] = await connection.query<AnswerRowDataPacket[]>(
                `SELECT id, answer_text, is_correct FROM answer WHERE question_id = ?`,
                [question.id]
            )

            resQuestion.push({
                questionId: question.id,
                question_text: question.question_text,
                correct_answer_id: question.correct_answer_id,
                answers: answerList,
            })
        })
    )

    const resQuiz = {
        quizId: quizId,
        title: quiz.title,
        difficulty: quiz.difficulty,
        description: quiz.description,
        questions: resQuestion,
    }

    return resQuiz
}

export async function addQuiz(quiz: Quiz) {
    const connection = await connect()

    const { title, difficulty, description, questions } = quiz

    const [quizResult] = await connection.query<ResultSetHeader>(
        `insert into quiz(title, difficulty, description) values(?,?,?)`,
        [title, difficulty, description]
    )
    const quizId = quizResult.insertId

    await Promise.all(
        questions.map(async function (question) {
            const { question_text, answers } = question
            const [questionResult] = await connection.query<ResultSetHeader>(
                `insert into question (question_text,quiz_id) values (?,?)`,
                [question_text, quizId]
            )

            const questionId = questionResult.insertId

            await Promise.all(
                answers.map(async function (answer) {
                    const { answer_text, is_correct } = answer
                    const [answerResult] =
                        await connection.query<ResultSetHeader>(
                            `insert into answer (answer_text, is_correct,question_id) values (?,?,?)`,
                            [answer_text, is_correct, questionId]
                        )
                })
            )
        })
    )
    return { quizId }
}
