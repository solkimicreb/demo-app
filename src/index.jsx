import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import ContactList from './ContactList'
import Store from './Store'
import './style.less'

const store = new Store()

render(
  <AppContainer>
    <ContactList store={store}/>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./ContactList', () => {
    const ContactList = require('./ContactList').default

    render(
      <AppContainer>
        <ContactList store={store}/>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
