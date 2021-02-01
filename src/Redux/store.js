import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import RootReducer from './root-reducer';
import thunk from 'redux-thunk';
const middlewares = [thunk];

if(process.env.NODE_ENV === 'developement'){
    middlewares.push(logger);
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(RootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default Store;