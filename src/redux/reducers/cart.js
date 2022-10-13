const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
  countTypesOfId: {}
};

//Возвращает id 
const getIdPizzaItem = ({ id, type, size }) => `${id}_${type}_${size}`

//Возвращает общую цену
const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

//Возвращает количество обЪектов по определенному ключу (id)
const getCountTypesOfId = (arr, number) => {
  const result = Object.entries(arr).reduce((sum, el) => {
    if (Number.parseInt(el[0].charAt(0)) === number) {
      sum += el[1].arrPizza.length
    }
    return sum
  }, 0);
  return result
}

//Уменьшает определенное значение свойства в обЪекте. Если это значение меньше 0, то удаляет свойство полностью из объекта
const deleteCountTypesOfId = (action, state) => {
  const idItem = getIdPizzaItem(action.payload);
  const deleteItemCount = state.items[idItem].arrPizza.length;

  const valCurrentCountType = state.countTypesOfId[action.payload.id]
  const newValCountType = valCurrentCountType - deleteItemCount;

  if (newValCountType > 0) {
    const newCountType = {
      ...state.countTypesOfId,
      [action.payload.id]: newValCountType
    }
    return newCountType
  } else {
    const newCountType = {
      ...state.countTypesOfId,
    }
    delete newCountType[action.payload.id];
    return newCountType
  }
}

//Удаляет объект из объекта объектов itemы и обновляет state
const deleteItemCart = (action, state) => {
  const idItem = getIdPizzaItem(action.payload);

  const deleteItemCount = state.items[idItem].arrPizza.length;
  const deleteItemPrice = state.items[idItem].totalPrice;

  const newCount = state.totalCount - deleteItemCount;
  const newPrice = state.totalPrice - deleteItemPrice;

  const newItems = {
    ...state.items
  }
  delete newItems[idItem];

  return {
    ...state,
    items: newItems,
    totalPrice: newPrice,
    totalCount: newCount,
    countTypesOfId: deleteCountTypesOfId(action, state)
  }
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_CART": {
      const currentPizzas = !state.items[`${action.payload.id}_${action.payload.type}_${action.payload.size}`]
        ? [action.payload]
        : [...state.items[`${action.payload.id}_${action.payload.type}_${action.payload.size}`].arrPizza, action.payload]

      const newItems = {
        ...state.items,
        [`${action.payload.id}_${action.payload.type}_${action.payload.size}`]: {
          arrPizza: currentPizzas,
          totalPrice: getTotalPrice(currentPizzas),
        },
      };

      const currentCount = !state.countTypesOfId[action.payload.id] ? 1 : getCountTypesOfId(newItems, action.payload.id)
      const newCountType = {
        ...state.countTypesOfId,
        [action.payload.id]: currentCount,
      }

      //Object.values(obj) – возвращает массив значений. Получаем из массива объектов, массив массивов
      const arrPizza = Object.values(newItems).map(obj => obj.arrPizza);
      //flat() - метод создает новый массив со всеми элементами подмассива, объединенными в него рекурсивно до указанной глубины.
      const allPizzas = arrPizza.flat();

      return {
        ...state,
        items: newItems,
        totalPrice: getTotalPrice(allPizzas),
        totalCount: allPizzas.length,
        countTypesOfId: newCountType
      }
    }

    case "DELETE_ITEM_CART": {
      return deleteItemCart(action, state);
    }

    case "PLUS_ITEM_CART": {
      const idItem = getIdPizzaItem(action.payload);
      const valCurrentCountType = state.countTypesOfId[action.payload.id];

      const arrPizzaNew = [
        ...state.items[idItem].arrPizza,
        state.items[idItem].arrPizza[0]
      ]

      const newItems = {
        ...state.items,
        [idItem]: {
          arrPizza: arrPizzaNew,
          totalPrice: getTotalPrice(arrPizzaNew)
        }
      }

      const newCountType = {
        ...state.countTypesOfId,
        [action.payload.id]: valCurrentCountType + 1
      }

      const newTotalPrice = state.totalPrice + arrPizzaNew[0].price;
      const newTotalCount = state.totalCount + 1;

      return {
        ...state,
        items: newItems,
        totalPrice: newTotalPrice,
        totalCount: newTotalCount,
        countTypesOfId: newCountType
      }
    }

    case "MINUS_ITEM_CART": {
      const idItem = getIdPizzaItem(action.payload);
      const valCurrentCountPizza = state.items[idItem].arrPizza.length;
      const valCurrentCountTypeID = state.countTypesOfId[action.payload.id]

      if (valCurrentCountPizza - 1 > 0) {
        const arrPizzaNew = state.items[idItem].arrPizza.slice(1);

        const newItems = {
          ...state.items,
          [idItem]: {
            arrPizza: arrPizzaNew,
            totalPrice: getTotalPrice(arrPizzaNew)
          }
        }

        const newTotalPrice = state.totalPrice - arrPizzaNew[0].price;
        const newTotalCount = state.totalCount - 1;

        return {
          ...state,
          items: newItems,
          totalPrice: newTotalPrice,
          totalCount: newTotalCount,
          countTypesOfId: valCurrentCountTypeID - 1 > 0
            ? {
              ...state.countTypesOfId,
              [action.payload.id]: valCurrentCountTypeID - 1
            }
            : deleteCountTypesOfId(state, action)
        }


      } else {
        return deleteItemCart(action, state);
      }
    }

    case "CLEAR_PIZZA_CART":
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
        countTypesOfId: 0
      }

    default:
      return state
  }
}

export default cart;