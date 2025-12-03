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
            setType('programming')
            refetch()
            setShow(false)
          }}
        >
          Programming
        </button>
        <button
          onClick={() => {
            setType('general')
            refetch()
            setShow(false)
          }}
        >
          General
        </button>
        <button
          onClick={() => {
            setType('knock-knock')
            refetch()
            setShow(false)
          }}
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
