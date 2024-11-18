import { useState } from 'react'
import './App.css'
import {Provider} from 'react-redux';
import AutoComplete from './component/autoComplete'
import store from './store'

function App() {

  return (
    <Provider store={store}>
      <AutoComplete />
    </Provider>
  )
}

export default App
