'use client'

import { getProduct } from '@/app/_actions/getProduct'
import Title from '@/app/_components/Title'
import ResponsiveImage from '@/app/_components/ResponsiveImage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatPrice } from '@/app/_utils/formatPrice'
import { useProducts } from '@/app/_store'
import { Product as TProduct } from '@/app/_types'

type ProductProps = {
  productId: TProduct['id']
  product: Awaited<ReturnType<typeof getProduct>>
}

export default function Product({ productId, product }: ProductProps) {
  const { products } = useProducts()

  const _product =
    products.find(_product => _product.id === productId) || product

  if (!_product) return <></>

  const { id, title, description, category, price, image, rating } = _product

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
          {category && (
            <p className='text-lg md:text-xl'>Category: {category}</p>
          )}
          <p className='text-lg md:text-xl'>Price: {formatPrice(price)}</p>
          {rating && (
            <div className='flex items-center'>
              <svg
                className='w-6 h-6 text-yellow-300'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 22 20'>
                <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
              </svg>
              <p className='ms-2 text-lg font-bold text-gray-900 dark:text-white'>
                {rating.rate}
              </p>
              <span className='w-2 h-2 mx-2.5 bg-gray-500 rounded-full dark:bg-gray-400'></span>
              <span className='text-lg font-medium text-gray-900 underline dark:text-white'>
                {rating.count} reviews
              </span>
            </div>

            // <p className='text-lg md:text-xl'>
            //   Rating: {rating.rate} / {rating.count}
            // </p>
          )}
        </div>
        <ResponsiveImage src={image} alt={title} width={524} height={750} />
      </div>
    </>
  )
}
