//Начальное состояние
const initialState = {
  category: null,
  sortBy: "popular"
}

//редусер
const filters = (state = initialState, action) => {
  if (action.type === "SET_SORT_BY") {
    return {
      ...state, //неглубокое копированиие
      sortBy: action.payload
    };
  }
  else if (action.type === "SET_CATEGORY") {
    return {
      ...state, //неглубокое копированиие
      sortBy: action.payload
    }
  }
  return state;
}

export default filters;