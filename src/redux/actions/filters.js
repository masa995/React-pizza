//создаем функции которая возвращает новый объект
//создаем новый экшен

export const setSortByAction = (name) => ({
  type: "SET_SORT_BY",
  payload: name
});

export const setCategoryAction = (catIndex) => ({
  type: "SET_CATEGORY",
  payload: catIndex
})