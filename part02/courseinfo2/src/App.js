const Course = ({ name, parts }) => {
  return (
    <div>
      <Header heading={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Header = ({ heading }) => {
  return (
    <div>
      <h1>{heading}</h1>
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
const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
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

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} name={course.name} parts={course.parts} /> 
      )}
    </div>
  )
}

export default App;
