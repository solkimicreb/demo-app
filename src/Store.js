import { observable, action, toJS } from 'mobx'
import * as api from './api'

let counter = 0

export default class AppStore {
  @observable contacts = [dataToContact({
    first_name: 'Miklos',
    last_name: 'Bertalan',
    email: 'miklos.bertalan@risingstack.com',
    phone: '+3630-821-7872',
    id: 0
  }), dataToContact({
    first_name: 'Zsoldos',
    last_name: 'Vanda',
    email: 'zsoldos.vanda@gmail.com',
    phone: '+3630-671-8345',
    id: 1
  })]
  @observable.ref allContacts = []
  @observable sortBy = 'first_name'

  @action.bound addContact () {
    const data = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      id: counter++
    }
    const contact = dataToContact(data, true)
    this.contacts.push(contact)
  }

  @action.bound deleteContact (contact) {
    const index = this.contacts.findIndex(item => item.id === contact.id)
    this.contacts.splice(index, 1)
  }

  @action.bound saveContact (contact) {
    contact.editing = false
  }

  @action.bound undoContactEdit (contact) {
    const historyItem = contact.history.pop()
    if (historyItem) {
      Object.assign(contact, historyItem)
    }
    contact.editing = false
  }

  @action.bound editContact (contact) {
    addHistoryItem(contact)
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

  @action.bound filterContacts (ev) {
    const filterKey = ev.target.name
    const filterValue = ev.target.value
    if (filterValue) {
      this.allContacts = this.contacts
      this.contacts = this.contacts.filter(contact => contact[filterKey].includes(filterValue))
    } else {
      this.contacts = this.allContacts
    }
  }
}

function addHistoryItem (contact) {
  const data = contactToData(contact)
  contact.history.push(data)
}

function contactToData (contact) {
  const data = Object.assign({}, contact)
  delete data.history
  delete data.editing
  return data
}

function dataToContact (data, editing) {
  return Object.assign({}, data, { id: counter++, history: [data], editing })
}

api.getContacts()
  .then(console.log)
