'use client'

import { getProduct } from '@/app/_actions/getProduct'
import Title from '@/app/_components/Title'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ProductForm from '@/app/_components/ProductForm'

import { useProducts } from '@/app/_store'

type ProductProps = {
  product: Awaited<ReturnType<typeof getProduct>>
}

export default function Product({ product }: ProductProps) {
  const { products } = useProducts()

  if (!product) throw new Error('Product is null')

  const _product = products.find(_product => _product.id === product.id)

  const { id, title, description, price } = _product || product

  return (
    <>
      <Title
        button={
          <div className='flex gap-3 items-center'>
            <Button asChild variant='ghost'>
              <Link href={`/${id}`}>View this product</Link>
            </Button>
            <Button asChild variant='ghost'>
              <Link href='/'>View all products</Link>
            </Button>
          </div>
        }>
        Edit Product
      </Title>
      <ProductForm
        productId={id}
        defaultValues={{
          title,
          description,
          price,
        }}
      />
    </>
  )
}
