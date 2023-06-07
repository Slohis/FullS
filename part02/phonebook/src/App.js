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
    const newEntryObject = {
      name: newName
    }
    setPersons(persons.concat(newEntryObject))
    setNewName('')
  }

  const handleInputChange = (event) => {
    console.log('change event', event.target.value)
    setNewName(event.target.value)
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