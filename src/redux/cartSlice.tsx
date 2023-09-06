import { createSlice } from '@reduxjs/toolkit'
import { CartItem } from '../components/ShoppingCart'

export interface CartState {
  basket: CartItem[]
  totalPrice: number
}

const initialState: CartState = {
  basket: [],
  totalPrice: 0
}
const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      return {
        ...state,
        basket: [...state.basket, action.payload] // Add the item to the basket array
      }
    },
    getTotalPrice: (state) => {
      const calculation = [...state.basket]
        .map((item) => {
          return parseFloat(item.price) - parseFloat(item.saleAmount)
        })
        .reduce((a, b) => {
          return a + b
        }, 0)
      console.log(calculation)
      return {
        ...state,
        totalPrice: calculation
      }
    },
    removeFromBasket: (state, action) => {
      const arr = [...state.basket]
      console.log(arr)
      const newArr = arr.filter((product, i) => i !== action.payload)

      return { ...state, basket: newArr }
    }
  }
})

export const { addToBasket, getTotalPrice, removeFromBasket } = cartSlice.actions // Use cartSlice.actions // important to remember about the s at the end.
export default cartSlice.reducer
