import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from './reducers';

//redux-thunk -  позволяет писать функции с логикой внутри actions, которые могут взаимодействовать с хранилищем

//applyMiddleware - программы, которые работают между store и reducer. Что-то делает сданными прежде, чем отправить на store

//compose - обьединяет несколько applyMiddleware

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
  thunk
)));

export default store;