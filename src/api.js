import 'whatwg-fetch'
// import io from 'socket.io-client'

/*const socket = io('http://localhost:3000')
socket.on('connection', client => { console.log('connected', client ) })*/

const API_URL = 'http://localhost:3000/api/v1'
const headers = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'authorized-request': true
}

export function getContacts (fromDate, toDate) {
  return fetch(`${API_URL}/contact?fromDate=${fromDate}&toDate=${toDate}`, { headers })
    .then(resp => resp.json())
}

export function getContact (id) {
  return fetch(`${API_URL}/contact/${id}`, { headers })
    .then(resp => resp.json())
}

export function createContact (contact) {
  const body = JSON.stringify(contact)
  return fetch(`${API_URL}/contact`, { method: 'POST', body, headers })
    .then(resp => resp.json())
}

export function deleteContact (id) {
  return fetch(`${API_URL}/contact/${id}`, { method: 'DELETE', headers })
    .then(resp => resp.json())
}

export function updateContact (contact) {
  const body = JSON.stringify(contact)
  return fetch(`${API_URL}/contact/${contact.id}`, { method: 'PATCH', body, headers })
    .then(resp => resp.json())
}
