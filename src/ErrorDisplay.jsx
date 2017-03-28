import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class ErrorDisplay extends Component {
  render () {
    const { error } = this.props
    return (error ? <p className="error"><span>ERROR:</span> {error}</p> : null)
  }
}
