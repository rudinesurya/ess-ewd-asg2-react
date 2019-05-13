import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './app/App';
import ScrollToTop from './app/utils/ScrollToTop';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import store from './app/redux/store';
import { loadCurrentUser, setCurrentUser } from './app/redux/actions/auth';

// axios.defaults.baseURL = 'https://ess-ewd-nodeserver.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:3002';

store.dispatch(loadCurrentUser());

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
        <ToastContainer autoClose={2000} pauseOnFocusLoss={false} position="bottom-right" />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
