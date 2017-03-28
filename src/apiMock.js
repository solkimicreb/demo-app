const contacts = loadContacts() || {}
let idCounter = 0

export function getContacts () {
  return Promise.resolve(Object.values(contacts))
}

export function getContact (id) {
  return Promise.resolve(contacts[id])
}

export function createContact (contact) {
  const id = idCounter++
  contact.id = id
  contacts[id] = contact
  saveContacts()
  return Promise.resolve(contact)
}

export function deleteContact (contact) {
  delete contacts[contact.id]
  saveContacts()
  return Promise.resolve(contact)
}

export function updateContact (contact) {
  const storedContact = contacts[contact.id]
  Object.assign(storedContact, contact)
  saveContacts()
  return Promise.resolve(storedContact)
}

function saveContacts () {
  localStorage.setItem('contacts', JSON.stringify(contacts))
}

function loadContacts () {
  return JSON.parse(localStorage.getItem('contacts'))
}
