import { useState, useEffect } from 'react'
import QuizCard from '../components/QuizCard'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'

interface Quiz {
  id: number
  title: string
  description: string
  difficulty: string
}

interface ApiResponse {
  total_pages: number
  data: Quiz[]
}

export default function Home() {
  const [quiz, setQuiz] = useState<Quiz[]>([])
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const page = 1
  useEffect(() => {
    fetch(`http://localhost:8080/quiz`)
      .then((response) => response.json())
      .then((output: ApiResponse) => {
        console.log(output)
        const { total_pages, data } = output
        setTotalPages(total_pages)
        setQuiz(data)
      })
      .catch((error) => console.error('Error:', error))
  }, [])

  return (
    <>
      <div className="bg-transparent grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
        {quiz.map((quizItem: Quiz, index: number) => (
          <QuizCard
            key={index}
            quizTitle={quizItem.title}
            description={quizItem.description}
            difficulty={quizItem.difficulty}
            url={`quiz/${quizItem.id}`}
          />
        ))}
      </div>
      <div className="flex justify-center w-screen align-bottom">
        <button className="m-1 p-1 px-3 rounded-md bg-gray-50">
          <MdOutlineChevronLeft />
        </button>
        <button className="m-1 p-1 px-3 rounded-md bg-gray-50">{page}</button>
        <button className="m-1 p-1 px-3 rounded-md bg-gray-50">
          {page + 1}
        </button>
        <span className="m-1 p-1 px-2 ">. . .</span>
        <button className="m-1 p-1 px-3 rounded-md bg-gray-50">
          {page + 9}
        </button>
        <button className="m-1 p-1 px-3 rounded-md bg-gray-50">
          <MdOutlineChevronRight />
        </button>
      </div>
    </>
  )
}
