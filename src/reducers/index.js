import data from './data';
import modal from './modal';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    data: data,
    modal
})

export default rootReducer;