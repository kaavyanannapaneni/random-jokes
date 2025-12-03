import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import './index.css'

const Jokes = () => {
  const [show, setShow] = useState(false)
  const [type, setType] = useState('general')
  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['jokes', type],
    queryFn: () => getJokes(type),
  })

  if (data) {
    console.log(data)
  }

  const handleJokeType = (type) => {
    setType(type)
    refetch()
    setShow(false)
  }
  
  return (
    <>
      <div className='container'>
        {isLoading || isFetching ? (
          <div className='loader'></div>
        ) : (
          <>
            <h1>{data[0]?.setup}</h1>
            {show && <h1>{data[0]?.punchline}</h1>}
            {!show && (
              <button
                onClick={() => {
                  setShow(true)
                }}
              >
                Punchline
              </button>
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
  const response = await fetch(
    `https://official-joke-api.appspot.com/jokes/${type}/random`
  )
  return await response.json()
}

export default Jokes
