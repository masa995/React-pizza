import { combineReducers } from 'redux';
import filtersReducer from './filters';
import pizzasReducer from './pizzas';
import cartReducer from './cart';

//пишем обект в свойствах, которого хранятся функции Reducer
const rootReducer = combineReducers({
  filter: filtersReducer,
  pizzas: pizzasReducer,
  cart: cartReducer
})

export default rootReducer;