import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const ListItem = ({ id, name, number, remove }) => {
  return (
    <div>{name} {number} <button onClick={() => remove(id, name)}>delete</button></div>
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
        <ListItem id={person.id} key={person.name} name={person.name} number={person.number} remove={props.remove} />
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialEntries => {
        setPersons(initialEntries)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()
    const newEntryObject = {
      name: newName,
      number: newNumber,
    }
    if (!isNameExisting(newName)) {
      personService
        .create(newEntryObject)
        .then(returnedEntry => {
          setPersons(persons.concat(returnedEntry))
          setNewName('')
          setNewNumber('')
        })
      setNotificationMessage(`Added ${newName}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const entryToUpdate = getPersonByName(newName)
        const updatedEntry = { ...entryToUpdate, number: newNumber}
        personService
          .update(updatedEntry.id, updatedEntry)
          .then(returnedEntry => {
            setPersons(persons.map(person => person.id !== updatedEntry.id ? person : updatedEntry))

          })
        setNotificationMessage(`Changed the phone number of ${newName}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }

    }
  }

  const removeEntry = (id, name) => {
    console.log(`deletion of entry id ${id} requested`)
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .remove(id)
        .then(returnedObject => {
          console.log(`deletion of entry id ${id}: ${name}`)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const getPersonByName = (name) => {
    const match = persons.find(person => person.name === name)
    return match
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
      <Notification message={notificationMessage} />
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
      <Persons persons={persons} filterString={filterString} remove={removeEntry} />
    </div>
  )
}

export default App