import {legacy_createStore,applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';

export default Store = legacy_createStore(rootReducer,applyMiddleware(thunk));