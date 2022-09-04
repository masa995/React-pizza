//Начальное состояние
const initialState = {
  category: null,
  sortBy: {
    type: "popular",
    order: "desc"
  }
}

//редусер
const filters = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SORT_BY":
      return {
        ...state, //неглубокое копированиие
        sortBy: action.payload
      }
    case "SET_CATEGORY":
      return {
        ...state, //неглубокое копированиие
        category: action.payload
      }
    default:
      return state;
  }
}

export default filters;