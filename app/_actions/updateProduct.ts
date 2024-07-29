'use server'
import 'server-only'
import { cache } from 'react'
import axios from 'axios'
import { Product } from '@/app/_types'
import { PRODUCT_API_BASE } from '@/app/_constants'

/**
 * @description Server Action - asynchronous function that is executed on the server. It can be used in Server and Client Components to handle form submissions and data mutations
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
export const updateProduct = cache(
  async (
    id: Product['id'],
    body: Pick<Product, 'title' | 'description' | 'price'>,
  ) => {
    console.log('updateProduct')
    try {
      const res = await axios.put(`${PRODUCT_API_BASE}/products/${id}`, body)
      return res.data
    } catch (error) {
      return null
    }
  },
)
