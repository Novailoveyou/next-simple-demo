'use client'
import { ComponentProps, createContext, useContext, useReducer } from 'react'
import { Product } from '@/app/_types'
import { createProduct } from '@/app/_actions/createProduct'
import { updateProduct } from '@/app/_actions/updateProduct'
import { removeProduct } from '@/app/_actions/removeProduct'

type Products = Product[]

type Action =
  | { type: 'set'; payload: Products }
  | {
      type: 'create'
      payload: Parameters<typeof createProduct>
    }
  | { type: 'update'; payload: Parameters<typeof updateProduct> }
  | { type: 'delete'; payload: Parameters<typeof removeProduct> }

const reducer = (state: Products, action: Action) => {
  switch (action.type) {
    case 'set':
      return action.payload
    case 'create':
      return [...(action.payload as unknown as Product[]), ...state]
    case 'update':
      return state.map(item =>
        item.id === action.payload[0]
          ? { ...item, ...action.payload[1] }
          : item,
      )
    case 'delete':
      return state.filter(item => item.id !== action.payload[0])
    default:
      return state
  }
}

const INITIAL_STATE = {
  products: [] as Products,
  setProducts: (products: Product[]) => {},
  createProduct: (...params: Parameters<typeof createProduct>) => {},
  updateProduct: (...params: Parameters<typeof updateProduct>) => {},
  removeProduct: (...params: Parameters<typeof removeProduct>) => {},
} as const

const ProductsContext = createContext(INITIAL_STATE)

export const ProductsProvider = ({
  children,
}: Pick<ComponentProps<'div'>, 'children'>) => {
  const [products, dispatch] = useReducer(reducer, INITIAL_STATE.products)

  const setProducts = (payload: Products) => dispatch({ type: 'set', payload })

  const _createProduct = (...payload: Parameters<typeof createProduct>) =>
    dispatch({ type: 'create', payload })

  const _updateProduct = (...payload: Parameters<typeof updateProduct>) =>
    dispatch({ type: 'update', payload })

  const _removeProduct = (...payload: Parameters<typeof removeProduct>) =>
    dispatch({ type: 'delete', payload })

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        createProduct: _createProduct,
        updateProduct: _updateProduct,
        removeProduct: _removeProduct,
      }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)

  if (!context)
    throw new Error('useProducts must be used within ProductsContext.Provider')

  return context
}
