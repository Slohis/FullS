
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Content = (props) => {
  return (
    <div>
      <p>{props.part_name} {props.exercise_amount}</p>
    </div>
  );
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total_amount}</p>
    </div>
  );
}


const App = () => {

  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content part_name={part1} exercise_amount={exercises1} />
      <Content part_name={part2} exercise_amount={exercises2} />
      <Content part_name={part3} exercise_amount={exercises3} />
      <Total total_amount={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

export default App;
