import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './app/App';
import ScrollToTop from './app/utils/ScrollToTop';
import store from './app/redux/store';
import 'semantic-ui-css/semantic.min.css';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App/>
        <ToastContainer autoClose={2000} pauseOnFocusLoss={false} position="bottom-right"/>
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
