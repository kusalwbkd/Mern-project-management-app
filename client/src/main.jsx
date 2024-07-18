import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'normalize.css'
import './index.css'
import axios from 'axios'
import { store } from './store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <App />
    <ToastContainer position='top-center' />
    </Provider>
)
