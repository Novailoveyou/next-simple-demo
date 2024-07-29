'use server'
import 'server-only'
import { cache } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Product } from '@/app/_types'
import toString from 'lodash/toString'
import { PRODUCT_API_BASE } from '@/app/_constants'

/**
 * @description Server Action - asynchronous function that is executed on the server. It can be used in Server and Client Components to handle form submissions and data mutations
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
export const getProductStaticParams = cache(async () => {
  try {
    const res = await axios.get<Product[]>(`${PRODUCT_API_BASE}/products`)

    return res.data.map(({ id }) => ({
      productId: id ? toString(id) : uuidv4(),
    }))
  } catch (error) {
    return []
  }
})
