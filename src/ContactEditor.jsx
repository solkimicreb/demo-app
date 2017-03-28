import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class ContactEditor extends Component {
  constructor () {
    super()
    this.modifyContact = this.modifyContact.bind(this)
    this.saveContact = this.saveContact.bind(this)
    this.deleteContact = this.deleteContact.bind(this)
    this.undoContactEdit = this.undoContactEdit.bind(this)
  }

  modifyContact (ev) {
    const { contact, store } = this.props
    store.modifyContact(contact, ev)
  }

  saveContact () {
    const { contact, store } = this.props
    store.saveContact(contact)
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
    const { saveContact, undoContactEdit, modifyContact, deleteContact } = this
    const { contact } = this.props
    return (
      <tr>
        <td>
          <input name="first_name" value={contact.first_name}
            onChange={modifyContact} placeholder="First name"/>
        </td>
        <td>
        <input name="last_name" value={contact.last_name}
          onChange={modifyContact} placeholder="Last name"/>
        </td>
        <td>
        <input type="email" name="email" value={contact.email}
          onChange={modifyContact} placeholder="Email"/>
        </td>
        <td>
        <input name="phone" value={contact.phone}
          onChange={modifyContact} placeholder="Phone number"/>
        </td>
        <td>
          <button onClick={saveContact}>Save</button>
        </td>
        <td>
          <button onClick={undoContactEdit}>Undo</button>
        </td>
        <td>
          <button onClick={deleteContact}>X</button>
        </td>
      </tr>
    )
  }
}
