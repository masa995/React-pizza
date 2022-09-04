const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      //копируем весь state, копируем items из state(...state.items), если в items НЕТ ЭЛЕМЕНТА С НУЖНЫМ, то создаем новый массив ([action.payload]), а если есть элементы, то их тоже копируем а далее добавляем новый экшн action.payload

      const newItems = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload]
      };

      //flat() - метод создает новый массив со всеми элементами подмассива, объединенными в него рекурсивно до указанной глубины.

      //Object.values(obj) – возвращает массив значений.

      const allPizzas = Object.values(newItems).flat();

      //const allPizzas = [].concat.apply([], Object.values(newItems))//массив из всех всех пицц

      const totalPrice = allPizzas.reduce((sum, obj) => obj.price + sum, 0); // цена всех пицц

      return {
        ...state,
        items: newItems,
        totalPrice: totalPrice,
        totalCount: allPizzas.length
      }
    }

    default:
      return state
  }
}

export default cart;