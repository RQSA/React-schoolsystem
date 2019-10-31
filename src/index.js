import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import Router from './router/router';
import { Provider } from 'react-redux';
import store from './store/store';
import * as serviceWorker from './serviceWorker';

const render = () => {
    return(
        <Provider store={ store }>
            <Router />
        </Provider>
    )
}

ReactDOM.render(render(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();