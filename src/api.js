import 'whatwg-fetch'

const API_URL = 'http://localhost:3000/api/v1'
const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'authorized-request': true
}

const socket = new Primus()
socket.on('data', (data) => console.log(data))
socket.on('connection', () => console.log('connected'))

export function getContacts (fromDate, toDate, orderBy, order) {
  return fetch(`${API_URL}/contact?fromDate=${fromDate}&toDate=${toDate}&orderBy=${orderBy}&order=${order}`, { headers })
    .then(checkError)
    .then(toJSON)
}

export function getContact (id) {
  return fetch(`${API_URL}/contact/${id}`, { headers })
    .then(checkError)
    .then(toJSON)
}

export function createContact (contact) {
  const body = JSON.stringify(contact)
  return fetch(`${API_URL}/contact`, { method: 'POST', body, headers })
    .then(checkError)
    .then(toJSON)
}

export function deleteContact (contact) {
  return fetch(`${API_URL}/contact/${contact.id}`, { method: 'DELETE', headers })
    .then(checkError)
}

export function updateContact (contact) {
  const body = JSON.stringify(contact)
  return fetch(`${API_URL}/contact/${contact.id}`, { method: 'PATCH', body, headers })
    .then(checkError)
}

function checkError (resp) {
  if (!resp.ok) {
    return resp.text()
      .then(text => {
        throw text
      })
  }
  return resp
}

function toJSON (resp) {
  return resp.json()
}
