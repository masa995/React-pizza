import { url } from '../constants';

export const setPizzasAction = (items) => ({
  type: "SET_PIZZAS",
  payload: items
})

export const setLoadedAction = (booleanKey) => ({
  type: "SET_LOADED",
  payload: booleanKey
})

//redux-thunk
export const fetchPizzas = (category, sortBy) => (dispatch) => {
  dispatch(setLoadedAction(false)); // пока контент не загрузился ставим заглушку
  fetch(`${url}?${category !== null ? `category=${category}` : ''}&sortBy=${sortBy.type}&order=${sortBy.order}`)
    .then((response) => response.json()).then((json) => {
      dispatch(setPizzasAction(json)) //сохроняем состояние в store
    })
    .catch((e) => console.error("Ошибка отправки"));
}