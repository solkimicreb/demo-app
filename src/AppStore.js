import { observable, action, toJS } from 'mobx'
import request from 'superagent'
import io from 'socket.io-client'

let counter = 0

const sampleContact = {
  first_name: 'Miklos',
  last_name: 'Bertalan',
  email: 'miklos.bertalan@risingstack.com',
  phone: '+3630-812-7872'
}

export default class AppStore {
  @observable contacts = []

  @action.bound addContact () {
    const contact = Object.assign({ id: counter++ }, sampleContact)
    this.contacts.push(contact)

    request
      .get('http://localhost:3002/api/v1/contact')
      .set('authorized-request', true)
      .end((err, res) => {
        console.log('contact', res)
      })
  }

  @action.bound removeContact () {
    this.contacts.pop()
  }
}

const socket = io('http://localhost:3002')
socket.on('connection', client => { console.log('connected', client ) })
