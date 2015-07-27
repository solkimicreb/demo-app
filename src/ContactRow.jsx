import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class ContactRow extends Component {
  render () {
    const { contact } = this.props
    return (
      <tr>
        <th>{contact.first_name}</th>
        <th>{contact.last_name}</th>
        <th>{contact.email}</th>
        <th>{contact.phone}</th>
      </tr>
    )
  }
}
