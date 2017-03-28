import 'whatwg-fetch'
import io from 'socket.io-client'

const socket = io('http://localhost:3002')
socket.on('connection', client => { console.log('connected', client ) })

const API_URL = 'http://localhost:3002/api/v1'
const headers = { 'authorized-request': true }

export function getContacts () {
  return fetch(`${API_URL}/contact`, { headers })
    .then(resp => resp.json())
}

export function getContact (id) {
  return fetch(`${API_URL}/contact/${id}`, { headers })
    .then(resp => resp.json())
}

export function createContact (contact) {
  return fetch(`${API_URL}/contact`, { method: 'POST', body: contact, headers })
    .then(resp => resp.json())
}

export function deleteContact (id) {
  return fetch(`${API_URL}/contact/${id}`, { method: 'DELETE', body: contact, headers })
    .then(resp => resp.json())
}

export function updateContact (contact) {
  return fetch(`${API_URL}/contact/${contact.id}`, { method: 'PATCH', body: contact, headers })
    .then(resp => resp.json())
}
