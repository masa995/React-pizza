//создаем функции которая возвращает новый объект
//создаем новый экшен

export const setSortByAction = ({ type, order }) => ({
  type: "SET_SORT_BY",
  payload: { type, order }
});

export const setCategoryAction = (catIndex) => ({
  type: "SET_CATEGORY",
  payload: catIndex
})