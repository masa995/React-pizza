export const addPizzaToCartAction = (pizzaObj) => ({
  type: 'ADD_PIZZA_CART',
  payload: pizzaObj,
});

export const clearCartAction = () => ({
  type: 'CLEAR_PIZZA_CART'
})

export const deleteCartItemAction = (idObj) => ({
  type: 'DELETE_ITEM_CART',
  payload: idObj

})

export const plusCartItemAction = (idObj) => ({
  type: 'PLUS_ITEM_CART',
  payload: idObj
})

export const minusCartItemAction = (idObj) => ({
  type: 'MINUS_ITEM_CART',
  payload: idObj
})