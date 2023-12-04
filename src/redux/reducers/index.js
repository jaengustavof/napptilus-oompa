import { combineReducers } from 'redux';
import oompaLoompaReducer from './oompaLoompaReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
    oompaLoompas: oompaLoompaReducer,
    search: searchReducer,
});

export default rootReducer;
