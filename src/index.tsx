import ReactDOM from 'react-dom';
import React from 'react';
import {App} from './app';

import './scss/app.scss';
import 'bootstrap';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const body = document.getElementById('root');
const appRoot = <App/>;
ReactDOM.render(appRoot, body);
