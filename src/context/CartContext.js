import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItemToCart: () => {},
  removeAllItems: () => {},
  deleteCartItem: () => {},
  increaseCartItemQuantity: () => {},
  decreaseCartItemQuantity: () => {},
})

export default CartContext
