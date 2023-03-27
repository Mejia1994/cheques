import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import {store} from "./components/store/store.js"
import {Provider} from 'react-redux'
import './main.out.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>,
)
