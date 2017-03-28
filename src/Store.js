import { observable, action, toJS } from 'mobx'
import * as api from './api'

let fakeIdCounter = 0
const ONE_DAY = 24 * 3600 * 1000

const sampleContact = {
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
}

export default class AppStore {
  @observable contacts = []
  @observable sortBy = 'firstName'
  @observable fromDate = Date.now() - ONE_DAY
  @observable toDate = Date.now()

  constructor () {
    api.getContacts(this.fromDate, this.toDate)
      .then(contacts => this.contacts = contacts.map(dataToContact))
  }

  @action.bound addContact () {
    const contact = dataToContact(sampleContact, true)
    this.contacts.push(contact)
  }

  @action.bound deleteContact (contact) {
    api.deleteContact(contact)
      .then(() => {
        const index = this.contacts.findIndex(item => item.id === contact.id)
        this.contacts.splice(index, 1)
      })
  }

  @action.bound saveContact (contact) {
    const data = contactToData(contact)
    if (contact.id === undefined) {
      api.createContact(data)
    } else {
      api.updateContact(data)
    }
    contact.editing = false
  }

  @action.bound undoContactEdit (contact) {
    const historyItem = contact.history.pop()
    if (historyItem) {
      api.updateContact(historyItem)
        .then(updated => Object.assign(contact, updated))
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

  @action.bound sortContacts (sortBy) {
    if (this.sortBy === sortBy) {
      this.contacts = this.contacts.reverse()
    } else {
      this.contacts = this.contacts.sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    }
    this.sortBy = sortBy
  }

  @action.bound filterContacts () {
    const fromDate = this.fromDate || Date.now()
    const toDate = this.toDate || (Date.now() - ONE_DAY)
    api.getContacts(fromDate, toDate)
      .then(contacts => this.contacts = contacts.map(dataToContact))
  }
}

function contactToData (contact) {
  const data = Object.assign({}, contact)
  delete data.history
  delete data.editing
  delete data.fakeId
  return data
}

function dataToContact (data, editing) {
  const contact = Object.assign({}, data, { history: [data], editing })
  if (contact.id === undefined) {
    contact.fakeId = `fake_${fakeIdCounter++}`
  }
  return contact
}
