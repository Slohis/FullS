import { useState } from 'react'

const AnecdoteOfTheDay = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdote}</p>
      <Votes votes={props.votes} />
    </div>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.mostVoted}</p>
      <p>has {props.voteAmount} votes</p>
    </div>
  )
}

const Votes = (props) => {
  return (
    <div>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const generateRandomNumber = (maxValue) => {
    return Math.floor(Math.random() * maxValue)
  }

  const displayNewAnecdote = () => {
    setSelected(generateRandomNumber(anecdotes.length))
  }

  const getMostVotedIndex = (points) => {
    let max = points[0]
    let maxIndex = 0
    console.log('points.length', points.length)

    for (let i = 1; i < points.length; i++) {
      if (points[i] > max) {
        maxIndex = i
        max = points[i]
        console.log('iterating points array')
      }
    }

    console.log('Max index' , maxIndex)
    return maxIndex
  }

  const addVote = (points, index) => {
    const newVoteArray = [ ...points ]
    newVoteArray[index] += 1
    setPoints(newVoteArray)
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <AnecdoteOfTheDay anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={() => addVote(points, selected)} text='vote' />
      <Button handleClick={() => displayNewAnecdote()} text='next anecdote' />
      <MostVotes mostVoted={anecdotes[getMostVotedIndex(points)]} voteAmount={points[getMostVotedIndex(points)]} />
    </div>
  )
}

export default App