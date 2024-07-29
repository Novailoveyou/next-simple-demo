import 'server-only'
import { cache } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { Product } from '@/app/_types'
import { getProductStaticParams } from '@/app/_actions/getProductStaticParams'
import { PRODUCT_API_BASE } from '@/app/_constants'

/**
 * @description Server Action - asynchronous function that is executed on the server. It can be used in Server and Client Components to handle form submissions and data mutations
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
export const getProduct = cache(
  async ({
    productId,
  }: {
    productId: Awaited<
      ReturnType<typeof getProductStaticParams>
    >[number]['productId']
  }) => {
    try {
      if (!productId) throw new Error()
      return (
        await axios.get<Product>(`${PRODUCT_API_BASE}/products/${productId}`)
      ).data
    } catch (error) {
      toast('Error while fetching the product')
      return null
    }
  },
)
