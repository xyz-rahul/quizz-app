import React, { useEffect, useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useParams } from 'react-router-dom'

interface Quiz {
  title: string
  difficulty: string
  description: string
  questions: {
    id: string
    question_text: string
    answers: {
      id: string
      answer_text: string
      is_correct: boolean
    }[]
  }[]
}

export default function Quiz() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  useEffect(() => {
    fetch(`http://localhost:8080/quiz/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .then((data) => setQuiz(data))
      .catch((error) => console.error('Error:', error))
  }, [])
  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!quiz) return // Quiz data not loaded yet

    let score = 0
    quiz.questions.forEach((question, index) => {
      const selectedAnswerId = selectedAnswers[index]
      const correctAnswer = question.answers.find((answer) => answer.is_correct)
      if (correctAnswer && selectedAnswerId === correctAnswer.id) {
        score++
      }
    })

    console.log('Score:', score)
  }
  return (
    <>
      {quiz && (
        <div className="flex flex-col items-center">
          <form className="m-4 p-2" onSubmit={onSubmit}>
            <h1 className="font-bold text-xl">{quiz.title}</h1>
            <h2 className="font-semibold text-md">{quiz.difficulty}</h2>
            <h3 className="font-light text-md">{quiz.description}</h3>

            {quiz.questions.map((question, index) => (
              <React.Fragment key={index}>
                <h1 className="font-bold text-lg mt-4">
                  <span className="mr-2">{index + 1}</span>
                  {question.question_text}
                </h1>
                <RadioGroup.Root
                  className="flex flex-col gap-2.5 min-w-[500px] w-fit"
                  defaultValue="default"
                  onValueChange={(value) => {
                    const newSelectedAnswers = [...selectedAnswers]
                    newSelectedAnswers[index] = value
                    setSelectedAnswers(newSelectedAnswers)
                  }}
                >
                  {question.answers.map((answer, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-200 bg-opacity-50 rounded-md"
                    >
                      <RadioGroup.Item
                        className="w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-black hover:bg-blue-200 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                        value={String(answer.id)}
                        id={String(answer.id)}
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-black" />
                      </RadioGroup.Item>
                      <label
                        className="text-[15px] leading-none pl-[15px] w-full p-2"
                        htmlFor={String(answer.id)}
                      >
                        {answer.answer_text}
                      </label>
                    </div>
                  ))}
                </RadioGroup.Root>
              </React.Fragment>
            ))}
            <div className="flex justify-center m-4">
              <button
                className="text-xl font-bold bg-blue-400 py-2 px-8 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
