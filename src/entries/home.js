import React from 'react';
import { render } from 'react-dom';
//import Playlist from './src/playlist/components/playlist';
import Home from '../pages/containers/home';
//import data from '../api.json'; 

//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from '../reducers/index'
import data from '../schemas/index';
import { Map as map } from 'immutable'; 

//console.log(data);
/*
const initialState = {
    data: {
        //...data,
        entities: data.entities,
        categories: data.result.categories,
        search: []
    },   
    modal: {
        visibility: false,
        mediaId: null,
    }
}
*/
const store = createStore(
    reducer,
    map(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const homeContainer = document.getElementById("home-container");
render(
    <Provider store={store}>
        <Home />
    </Provider>,
    homeContainer
)
//render(<Home data={data}/>, homeContainer);