import { Revalidate as _Revalidate } from 'next/dist/server/lib/revalidate'

export type Revalidate = _Revalidate

export type Product = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: {
    rate: number
    count: number
  }
}
