//создаем функции которая возвращает новый объект
//создаем новый экшен

export const setPizzasAction = (items) => ({
  type: "SET_PIZZAS",
  payload: items
})

export const setLoadedAction = (booleanKey) => ({
  type: "SET_LOADED",
  payload: booleanKey
})

//redux-thunk
export const fetchPizzas = () => (dispatch) => {
  dispatch(setLoadedAction(false)); // пока контент не загрузился ставим заглушку
  fetch("http://localhost:3001/pizzas").then((response) => response.json()).then((json) => {
    dispatch(setPizzasAction(json)) //сохроняем состояние в store
  });
}