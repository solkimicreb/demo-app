import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class ContactRow extends Component {
  constructor () {
    super()
    this.editContact = this.editContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.undoContactEdit = this.undoContactEdit.bind(this)
  }

  editContact () {
    const { contact, store } = this.props
    store.editContact(contact)
  }

  deleteContact () {
    const { contact, store } = this.props
    store.deleteContact(contact)
  }

  undoContactEdit () {
    const { contact, store } = this.props
    store.undoContactEdit(contact)
  }

  render () {
    const { editContact, undoContactEdit, deleteContact } = this
    const { contact } = this.props
    return (
      <tr>
        <td>{contact.first_name}</td>
        <td>{contact.last_name}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td><button onClick={editContact}>Edit</button></td>
        <td><button onClick={undoContactEdit}>Undo</button></td>
        <td><button onClick={deleteContact}>X</button></td>
      </tr>
    )
  }
}
