import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ContactRow from './ContactRow'

@observer
export default class Contacts extends Component {
  render () {
    const { contacts, addContact, removeContact } = this.props

    return (
      <div>
        <h2>Contacts</h2>
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            { contacts.map(contact => <ContactRow key={contact.id} contact={contact} />) }
          </tbody>
        </table>
        <button onClick={addContact}>
          Add contact
        </button>
        <button onClick={removeContact}>
          Remove contact
        </button>
      </div>
    )
  }
}
