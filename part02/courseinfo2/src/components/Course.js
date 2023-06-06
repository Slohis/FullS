const Header = ({ heading }) => {
  return (
    <div>
      <h1>{heading}</h1>
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accu, curr) => accu + Number(curr.exercises), 0
  )

  return (
    <div>
      <p><b>Total of {total} exercises</b></p>
    </div>
  )
}

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header heading={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course