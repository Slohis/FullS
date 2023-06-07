import { useState } from 'react'

const ListItem = ({ id, name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}

const Filter = (props) => {
  console.log('Filter component props:', props)

  return (
    <div>
      filter shown with <input value={props.filterString} onChange={props.eventHandler} />
    </div>
  )
}

const PersonForm = (props) => {
  console.log('Person form props:', props)

  return (
    <form onSubmit={props.addEntry}>
      <div>
        name: <input value={props.newName} onChange={props.nameInputEventHandler} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.numberInputEventHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  console.log('Persons list component props:', props)

  const entriesToShow = props.filterString
    ? props.persons.filter(person => person.name.toLowerCase().startsWith(props.filterString.toLowerCase(), 0))
    : props.persons

  return (
    <ul>
      {entriesToShow.map(person =>
        <ListItem id={person.id} key={person.name} name={person.name} number={person.number} />
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    console.log('submit event', event.target)
    if (!isNameExisting(newName)) {
      const newEntryObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newEntryObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameInputChange = (event) => {
    console.log('name field change to', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    console.log('number field change to', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    console.log('filter field change to', event.target.value)
    setFilterString(event.target.value)
  }

  const isNameExisting = (name) => {
    console.log('searching for existing name', name)
    const found = persons.some(person => person.name === name, false)
    console.log('existing name found?', found)
    return found
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={filterString} eventHandler={handleFilterInputChange} />
      <h3>Add a new</h3>
      <PersonForm
        addEntry={addEntry}
        newName={newName}
        newNumber={newNumber}
        nameInputEventHandler={handleNameInputChange}
        numberInputEventHandler={handleNumberInputChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterString={filterString} />
    </div>
  )
}

export default App