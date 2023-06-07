import { useState } from 'react'

const ListItem = ({ id, name }) => {
  return (
    <li>{name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    console.log('submit event', event.target)
    if (!isNameExisting(newName)) {
      const newEntryObject = {
        name: newName
      }
      setPersons(persons.concat(newEntryObject))
      setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleInputChange = (event) => {
    console.log('change event', event.target.value)
    setNewName(event.target.value)
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
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <ListItem key={person.name} name={person.name} />)}
      </ul>
    </div>
  )
}

export default App