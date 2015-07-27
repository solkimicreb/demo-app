import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import AppStore from './AppStore'
import Contacts from './Contacts'

const store = new AppStore()

render(
  <AppContainer>
    <Contacts contacts={store.contacts} addContact={store.addContact} removeContact={store.removeContact} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./Contacts', () => {
    const Contacts = require('./Contacts').default

    render(
      <AppContainer>
        <Contacts contacts={store.contacts} addContact={store.addContact} removeContact={store.removeContact} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
