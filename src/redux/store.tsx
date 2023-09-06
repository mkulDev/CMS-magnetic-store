import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import productsSlice from './productsSlice'
import { ProductState } from './productsSlice'
import { CartState } from './cartSlice'
export interface RootState {
  cart: CartState
  productsList: ProductState
}

const store = configureStore({
  reducer: {
    cart: cartSlice,
    productsList: productsSlice
  }
})

export default store
