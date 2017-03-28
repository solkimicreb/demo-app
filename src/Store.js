import { observable, action, toJS } from 'mobx'
import * as api from './api'

let fakeIdCounter = 0
const ONE_DAY = 24 * 3600 * 1000

const sampleContact = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  createdAt: undefined
}

export default class AppStore {
  @observable contacts = []
  @observable orderBy = 'firstName'
  @observable order = 'desc'
  @observable fromDate = Date.now() - ONE_DAY
  @observable toDate = Date.now()
  @observable error = undefined

  constructor () {
    api.getContacts(this.fromDate, this.toDate, this.orderBy, this.order)
      .then(contacts => this.contacts = contacts.map(dataToContact))
      .catch(error => this.setError(error))
  }

  @action.bound addContact () {
    const contact = dataToContact(sampleContact)
    contact.editing = true
    this.contacts.push(contact)
  }

  @action.bound deleteContact (contact) {
    api.deleteContact(contact)
      .then(() => {
        const index = this.contacts.findIndex(item => item.id === contact.id)
        this.contacts.splice(index, 1)
      })
      .catch(error => this.setError(error))
  }

  @action.bound saveContact (contact) {
    const data = contactToData(contact)
    if (contact.id === undefined) {
      api.createContact(data)
        .then(created => Object.assign(contact, created))
        .then(() => contact.editing = false)
        .catch(error => this.setError(error))
    } else {
      api.updateContact(data)
        .then(() => contact.editing = false)
        .catch(error => this.setError(error))
    }
  }

  @action.bound undoContactEdit (contact) {
    const historyItem = contact.history.pop()
    if (historyItem) {
      api.updateContact(historyItem)
        .then(() => Object.assign(contact, historyItem))
        .catch(error => this.setError(error))
    }
    contact.editing = false
  }

  @action.bound editContact (contact) {
    const data = contactToData(contact)
    contact.history.push(data)
    contact.editing = true
  }

  @action.bound modifyContact (contact, ev) {
    contact[ev.target.name] = ev.target.value
  }

  @action.bound sortContacts (orderBy) {
    if (this.orderBy === orderBy) {
      this.order = (this.order === 'asc') ? 'desc' : 'asc'
    } else {
      this.orderBy = orderBy
      this.order = 'desc'
    }
    api.getContacts(this.fromDate, this.toDate, this.orderBy, this.order)
      .then(contacts => this.contacts = contacts.map(dataToContact))
      .catch(error => this.setError(error))
  }

  @action.bound setDate (name, value) {
    this[name] = value
  }

  @action.bound filterContacts () {
    const fromDate = this.fromDate || Date.now()
    const toDate = this.toDate || (Date.now() - ONE_DAY)
    api.getContacts(fromDate, toDate, this.orderBy, this.order)
      .then(contacts => this.contacts = contacts.map(dataToContact))
      .catch(error => this.setError(error))
  }

  @action.bound setError (error) {
    this.error = error
    setTimeout(() => this.error = undefined, 3000)
  }
}

function contactToData (contact) {
  const data = Object.assign({}, contact)
  delete data.history
  delete data.editing
  delete data.fakeId
  return data
}

function dataToContact (data) {
  const contact = Object.assign({}, data, { history: [], editing: false })
  if (contact.id === undefined) {
    contact.fakeId = `fake_${fakeIdCounter++}`
  }
  return contact
}
