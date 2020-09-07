import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, BrowserRouter, Link } from 'react-router-dom';

import reducers from './reducers';
import App from './components/App';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App></App>
        </Router>
    </Provider>,
    document.querySelector('#root')
);
