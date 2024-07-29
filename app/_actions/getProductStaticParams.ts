'use server'
import 'server-only'
import { cache } from 'react'
import { v4 as uuidv4 } from 'uuid'
import toString from 'lodash/toString'
import { getProducts } from './getProducts'

/**
 * @description Server Action - asynchronous function that is executed on the server. It can be used in Server and Client Components to handle form submissions and data mutations
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
export const getProductStaticParams = cache(async () => {
  try {
    const products = await getProducts({ limit: 16 })

    return products.map(({ id }) => ({
      productId: id ? toString(id) : uuidv4(),
    }))
  } catch (error) {
    return []
  }
})
