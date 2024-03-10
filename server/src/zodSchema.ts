import z from 'zod'

export const QuizSchema = z.object({
    title: z.string(),
    difficulty: z.string(),
    description: z.string(),
    questions: z.array(
        z.object({
            question_text: z.string(),
            answers: z.array(
                z.object({
                    answer_text: z.string(),
                    is_correct: z.boolean(),
                })
            ),
        })
    ),
})
