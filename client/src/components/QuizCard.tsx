export default function QuizCard({
  quizTitle,
  description,
  difficulty,
  url,
}: {
  quizTitle: string
  description: string
  difficulty: string
  url: string
}) {
  return (
    <>
      <a href={url || '#'}>
        <section className="flex bg-transparent justify-center align-middle">
          <div className="relative flex w-80 h-[250px] opacity-75 hover:scale-110  transition m-4 flex-col rounded-xl bg-white p-4 bg-clip-border text-gray-700 shadow-md">
            <h1 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {quizTitle}{' '}
            </h1>
            <h5 className="font-semibold text-sm text-teal-800 ">
              difficulty: {difficulty}
            </h5>
            <p className="block h-full overflow-hidden font-sans text-base font-light leading-relaxed text-inherit antialiased">
              {description}
            </p>
            <button>Take Quiz</button>
          </div>
        </section>
      </a>
    </>
  )
}
