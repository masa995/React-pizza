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
  fetch(`/pizzas?${category !== null ? `category=${category}` : ''}&_sort=${sortBy.type}&_order=${sortBy.order}`)
    .then((response) => response.json()).then((json) => {
      dispatch(setPizzasAction(json)) //сохроняем состояние в store
    })
    .catch((e) => console.error("Ошибка отправки"));
}