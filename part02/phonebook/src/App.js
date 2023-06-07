import { useState } from 'react'

const ListItem = ({ id, name, number }) => {
  return (
    <div>{name} {number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    console.log('submit event', event.target)
    if (!isNameExisting(newName)) {
      const newEntryObject = {
        name: newName,
        number: newNumber,
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

  const isNameExisting = (name) => {
    console.log('searching for existing name', name)
    const found = persons.some(person => person.name === name, false)
    console.log('existing name found?', found)
    return found
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <ListItem key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}

export default App