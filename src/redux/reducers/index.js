import { combineReducers } from 'redux';
import filtersReducer from './filters';
import pizzasReducer from './pizzas';

//пишем обект в свойствах, которого хранятся функции Reducer
const rootReducer = combineReducers({
  filter: filtersReducer,
  pizzas: pizzasReducer
})

export default rootReducer;