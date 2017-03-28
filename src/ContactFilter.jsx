import React, { Component } from 'react'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

@observer
export default class ContactFilter extends Component {
  constructor () {
    super()
    this.filterByDate = this.filterByDate.bind(this)
  }

  filterByDate (ev) {
    const { setDate, filterContacts } = this.props.store
    const name = ev.target.name
    const value = (new Date(ev.target.value)).toISOString()
    setDate(name, value)
    filterContacts()
  }

  render () {
    const {filterByDate } = this
    const { store } = this.props
    const { fromDate, toDate } = store

    return (
      <div>
        <label>From date: </label>
        <input type="datetime-local" name="fromDate" value={formatDate(fromDate)} onChange={filterByDate} />
        <label>To date: </label>
        <input type="datetime-local" name="toDate" value={formatDate(toDate)} onChange={filterByDate} />
      </div>
    )
  }
}

function formatDate (date) {
  date = new Date(date)
  const seconds = ('0' + date.getSeconds()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const hours = ('0' + (date.getHours() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  console.log(date, `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`)
  return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}:${seconds}`
}
