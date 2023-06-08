import { useState, useEffect } from 'react'
import axios from 'axios'

const ListItem = ({ id, name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}

const Filter = (props) => {

  return (
    <div>
      filter shown with <input value={props.filterString} onChange={props.eventHandler} />
    </div>
  )
}

const PersonForm = (props) => {

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {    
    axios      
    .get('http://localhost:3001/persons')      
    .then(response => {        
      setPersons(response.data)      
    })  
  }, [])

  const addEntry = (event) => {
    event.preventDefault()
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
    const found = persons.some(person => person.name === name, false)
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