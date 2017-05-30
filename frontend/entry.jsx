import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

const store = configureStore();

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Root store={ store } />, document.getElementById('content'));
});