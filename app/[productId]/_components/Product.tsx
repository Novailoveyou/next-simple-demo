'use client'

import { getProduct } from '@/app/_actions/getProduct'
import Title from '@/app/_components/Title'
import ResponsiveImage from '@/app/_components/ResponsiveImage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatPrice } from '@/app/_utils/formatPrice'
import { useProducts } from '@/app/_store'

type ProductProps = {
  product: Awaited<ReturnType<typeof getProduct>>
}

export default function Product({ product }: ProductProps) {
  const { products } = useProducts()

  if (!product) throw new Error('Product is null')

  const _product = products.find(_product => _product.id === product.id)

  const { id, title, description, category, price, image, rating } =
    _product || product

  return (
    <>
      <Title
        className='flex-col-reverse'
        button={
          <div className='flex self-start gap-3 items-center'>
            <Button asChild variant='ghost'>
              <Link href='/'>View all products</Link>
            </Button>
            <Button asChild variant='ghost' className='self-start'>
              <Link href={`/${id}/edit`}>Edit</Link>
            </Button>
          </div>
        }>
        {title}
      </Title>
      <div className='flex flex-col md:flex-row gap-6 items-center md:items-stretch'>
        <div className='flex flex-col gap-4'>
          <p className='text-xl mb-4 md:text-2xl max-w-[50ch] md:mb-5'>
            {description}
          </p>
          <p className='text-lg md:text-xl'>Category: {category}</p>
          <p className='text-lg md:text-xl'>Price: {formatPrice(price)}</p>
          <p className='text-lg md:text-xl'>
            Rating: {rating.rate} / {rating.count}
          </p>
        </div>
        <ResponsiveImage src={image} alt={title} width={524} height={750} />
      </div>
    </>
  )
}