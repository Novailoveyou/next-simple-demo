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
export const createProduct = cache(
  async (body: Pick<Product, 'title' | 'description' | 'price'>) => {
    try {
      const res = await axios.post(`${PRODUCT_API_BASE}/products`, body)
      return res.data
    } catch (error) {
      return null
    }
  },
)
