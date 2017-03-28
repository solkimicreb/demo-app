import React, { Component } from 'react'
import { observer } from 'mobx-react'
import ContactItem from './ContactItem'
import ContactEditor from './ContactEditor'
import ContactFilter from './ContactFilter'
import ErrorDisplay from './ErrorDisplay'

@observer
export default class Contacts extends Component {
  render () {
    const { store } = this.props
    const { contacts, error, orderBy, addContact, sortContacts, filterContacts } = store

    return (
      <div>
        <h2>Contacts</h2>
        <ContactFilter store={store} />

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
              <th onClick={() => sortContacts('createdAt')}
                className={orderBy === 'createdAt' ? 'active' : undefined}>Created</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => contact.editing
              ? <ContactEditor key={contact.id || contact.fakeId} contact={contact} store={store} />
              : <ContactItem key={contact.id || contact.fakeId} contact={contact} store={store} />)}
          </tbody>
        </table>
        <button onClick={addContact}>Add Contact</button>
        <ErrorDisplay error={error}/>
      </div>
    )
  }
}
