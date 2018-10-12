import React from 'react';
import { render } from 'react-dom';
import Home from '../pages/containers/home';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers/index'
import data from '../schemas/index';
import { Map as map } from 'immutable'; 

/*function logger({getState,  dispatch}) {
    return (next) => {
        return (action) => {
            console.log('old state', getState().toJS());
            console.log('action', action);
            const value = next(action);
            console.log('new state', getState().toJS());
            return value;
        }
    }
}*/

const logger = ({getState,  dispatch}) => next => action => {
    console.log('old state', getState().toJS());
    console.log('action', action);
    const value = next(action);
    console.log('new state', getState().toJS());
    return value;
}

const store = createStore(
    reducer,
    map(),
    applyMiddleware(logger)
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const homeContainer = document.getElementById("home-container");
render(
    <Provider store={store}>
        <Home />
    </Provider>,
    homeContainer
)