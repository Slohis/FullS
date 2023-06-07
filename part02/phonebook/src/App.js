import { useState } from 'react'

const ListItem = ({ id, name, number }) => {
  return (
    <div>{name} {number}</div>
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

  const entriesToShow = filterString
    ? persons.filter(person => person.name.toLowerCase().startsWith(filterString.toLowerCase(), 0))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterString} onChange={handleFilterInputChange} />
      </div>
      <h2>Add a new</h2>
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
        {entriesToShow.map(person =>
          <ListItem id={person.id} key={person.name} name={person.name} number={person.number} />
        )}
      </ul>
    </div>
  )
}

export default App