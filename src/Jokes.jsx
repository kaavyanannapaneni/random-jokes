import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import './index.css'

const Jokes = () => {
  const [show, setShow] = useState(false)
  const [type, setType] = useState('general')
  const { data, refetch, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['jokes', type],
    queryFn: () => getJokes(type),
  })

  const handleJokeType = (type) => {
    setType(type)
    refetch()
    setShow(false)
  }

  return (
    <>
      <h1>
        <span>J</span>
        <span>O</span>
        <span>K</span>
        <span>E</span>
        <span>S</span>
      </h1>
      <div className='container'>
        {isLoading || isFetching ? (
          <div className='loader'></div>
        ) : (
          <>
            {isError ? (
              <>
                <h2>{error.message}</h2>
              </>
            ) : (
              <>
                <h2>{data[0]?.setup}</h2>
                {show && <h2>{data[0]?.punchline}</h2>}
                {!show && (
                  <button
                    onClick={() => {
                      setShow(true)
                    }}
                  >
                    Punchline
                  </button>
                )}
              </>
            )}

            {/* {show && (
              <button
                onClick={() => {
                  refetch()
                }}
              >
                Next
              </button>
            )} */}
          </>
        )}
      </div>
      <div className='joke-options'>
        <button
          onClick={() => {
            handleJokeType('programming')
          }}
          disabled={!show}
        >
          Programming
        </button>
        <button
          onClick={() => {
            handleJokeType('general')
          }}
          disabled={!show}
        >
          General
        </button>
        <button
          onClick={() => {
            handleJokeType('knock-knock')
          }}
          disabled={!show}
        >
          Knock-Knock
        </button>
      </div>
    </>
  )
}

const getJokes = async (type) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const response = await fetch(
      `https://official-joke-api.appspot.com/jokes/${type}/random`
    )
    return await response.json()
  } catch (error) {
    throw new Error('Oops.. this page took a day off.')
  }
}

export default Jokes
