import React from 'react';
import { Provider } from 'react-redux';
import App from './app';

/**
* Prop threading is an anti-pattern
* react-redux defines a Provider component which passes the store to deeply nested components without prop threading
* Create a Root component which takes store as a prop and returns the App component wrapped in the Provider component which also takes store as a prop
* We will render the Root component in our entry file, passing in the store we have created as a prop
* Provider then sets a store context, context is provided by React, this allows us access to the "invisible" store property in all child components
*/
const Root = ({ store }) => (
  <Provider store={ store }>
    <App />
  </Provider>
);

export default Root;