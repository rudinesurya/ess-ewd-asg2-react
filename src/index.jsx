import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import App from './app/App';
import ScrollToTop from './app/utils/ScrollToTop';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import store from './app/redux/store';
import { setCurrentUser } from './app/redux/actions/auth';
import setAuthToken from './app/utils/setAuthToken';

axios.defaults.baseURL = 'https://ess-ewd-nodeserver.herokuapp.com';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwtDecode(token);
  store.dispatch(setCurrentUser(decoded)); // Set current user
}

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
