import { createSlice } from '@reduxjs/toolkit'
import { CartItem } from '../components/ShoppingCart'

export interface ProductState {
  products: CartItem[]
  totalProductNumber: number | undefined
}

const initialState: ProductState = {
  products: [],
  totalProductNumber: 0
}
const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      console.log('update done')
      return {
        ...state,
        products: action.payload // Add the item to the basket array
      }
    },
    getTotalProductsNumber: (state) => {
      return { ...state, totalProductNumber: state.products.length }
    }
  }
})

export const { updateProducts, getTotalProductsNumber } = productsSlice.actions // Use cartSlice.actions // important to remember about the s at the end.
export default productsSlice.reducer
