import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import './index.css'

const Jokes = () => {
  const [show, setShow] = useState(false)
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['jokes'],
    queryFn: getJokes,
  })

  return (
    <div className='container'>
      {isLoading || isFetching ? (
        <div className='loader'></div>
      ) : (
        <>
          <h1>{data?.setup}</h1>
          {show && <h1>{data?.punchline}</h1>}
          {!show && (
            <button
              onClick={() => {
                setShow(true)
              }}
            >
              Punchline
            </button>
          )}
          {show && (
            <button
              onClick={() => {
                setShow(false)
                refetch()
              }}
            >
              Next
            </button>
          )}
        </>
      )}
    </div>
  )
}

const getJokes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const response = await fetch(
      `https://official-joke-api.appspot.com/jokes/random/`
    )
    return await response.json()
  } catch (error) {
    console.log('Error', error)
  }
}

export default Jokes
