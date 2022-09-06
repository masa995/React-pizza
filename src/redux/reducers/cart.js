const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
  countTypesOfId: {}
};

const getIdPizzaItem = ({ id, type, size }) => `${id}_${type}_${size}`

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0); //общая цена

const getCountTypesOfId = (arr, number) => {
  const result = Object.entries(arr).reduce((sum, el) => {
    if (Number.parseInt(el[0].charAt(0)) === number) {
      sum += el[1].arrPizza.length
    }
    return sum
  }, 0);
  return result
}

const deleteCountTypesOfId = (action, state) => {
  const idItem = getIdPizzaItem(action.payload);
  const deleteItemCount = state.items[idItem].arrPizza.length; //количество пицц определенного размера и типа

  const valCurrentCountType = state.countTypesOfId[action.payload.id] //количетво пицц определенного ID
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

const deleteItemCart = (action, state) => {
  const idItem = getIdPizzaItem(action.payload);

  const deleteItemCount = state.items[idItem].arrPizza.length; //количество пицц определенного размера и типа
  const deleteItemPrice = state.items[idItem].totalPrice; //цена за пиццы определенного размера и типа

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
      //копируем весь state, копируем items из state(...state.items), если в items НЕТ ЭЛЕМЕНТА С НУЖНЫМ, то создаем новый массив ([action.payload]), а если есть элементы, то их тоже копируем а далее добавляем новый экшн action.payload
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

      const currentCount = !state.countTypesOfId[action.payload.id] ? 1 : getCountTypesOfId(newItems, action.payload.id) //сначала новое значение
      const newCountType = {
        ...state.countTypesOfId,
        [action.payload.id]: currentCount,
      } //потом новый объект

      //Object.values(obj) – возвращает массив значений.
      //получаем из массива объектов, массив массивов
      const arrPizza = Object.values(newItems).map(obj => obj.arrPizza);
      //flat() - метод создает новый массив со всеми элементами подмассива, объединенными в него рекурсивно до указанной глубины.
      const allPizzas = arrPizza.flat();
      //const allPizzas = [].concat.apply([], Object.values(newItems))//массив из всех всех пицц
      //const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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

        // let newCountType = {}
        // if (valCurrentCountTypeID - 1 > 0) {
        //   newCountType = {
        //     ...state.countTypesOfId,
        //     [action.payload.id]: valCurrentCountTypeID - 1
        //   }
        // } else {
        //   newCountType = deleteCountTypesOfId(state, action);
        // }
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