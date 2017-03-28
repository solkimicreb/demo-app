import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ContactItem from './ContactItem'
import ContactEditor from './ContactEditor'

@observer
export default class Contacts extends Component {
  render () {
    const { store } = this.props
    const { contacts, orderBy, addContact, sortContacts, filterContacts } = store

    return (
      <div>
        <h2>Contacts</h2>
        <input name="firstName" onChange={filterContacts} placeholder="First name" />
        <input name="lastName" onChange={filterContacts} placeholder="Last name" />

        <table>
          <thead>
            <tr>
              <th onClick={() => sortContacts('firstName')}
                className={orderBy === 'firstName' ? 'active' : undefined}>First name</th>
              <th onClick={() => sortContacts('lastName')}
                className={orderBy === 'lastName' ? 'active' : undefined}>Last name</th>
              <th onClick={() => sortContacts('email')}
                className={orderBy === 'email' ? 'active' : undefined}>Email</th>
              <th onClick={() => sortContacts('phone')}
                className={orderBy === 'phone' ? 'active' : undefined}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => contact.editing
              ? <ContactEditor key={contact.id || contact.fakeId} contact={contact} store={store} />
              : <ContactItem key={contact.id || contact.fakeId} contact={contact} store={store} />)}
          </tbody>
        </table>
        <button onClick={addContact}>Add Contact</button>
      </div>
    )
  }
}
