import 'server-only'
import { ONE_HOUR_IN_SECONDS } from '@/app/_constants'
import { Revalidate } from '@/app/_types'
import { getProductStaticParams } from '@/app/_actions/getProductStaticParams'
import { NextPage } from 'next'
import Header from '@/app/_sections/Header'
import Main from '@/app/_sections/Main'
import Footer from '@/app/_sections/Footer'
import { Fragment } from 'react'
import { getProduct } from '@/app/_actions/getProduct'
import Container from '@/app/_components/Container'
import Title from '@/app/_components/Title'
import ResponsiveImage from '../_components/ResponsiveImage'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type ProductPageProps = {
  params: Awaited<ReturnType<typeof generateStaticParams>>[number]
}

/**
 * @description The `generateStaticParams` function can be used in combination with **dynamic route segments** to **statically generate** routes at build time instead of on-demand at request time
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params */
export const generateStaticParams = async () => await getProductStaticParams()

/**
 * @description To revalidate data at a timed interval, you can use the `next.revalidate` option of fetch to set the cache lifetime of a resource (in seconds)
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data */
export const revalidate: Revalidate = ONE_HOUR_IN_SECONDS

const ProductPage: NextPage<ProductPageProps> = async ({
  params: { productId },
}) => {
  const product = await getProduct({ productId })

  if (!product) throw new Error('Product is null')

  const { title, description, category, price, image, rating } = product

  return (
    <Fragment>
      <Header />
      <Main>
        <Container>
          <div className='flex flex-col md:flex-row gap-6 items-center'>
            <div>
              <p className='text-xl mb-4'>{category}</p>
              <Title>{title}</Title>
              <p className='text-2xl max-w-[50ch]'>{description}</p>
            </div>
            <div className='flex flex-col gap-4 items-center'>
              <ResponsiveImage
                src={image}
                alt={title}
                width={524}
                height={750}
              />
              <div className='flex flex-col gap-2'>
                <p className='text-2xl'>Price: {price}</p>
                <p className='text-2xl'>
                  Rating: {rating.rate} / {rating.count}
                </p>
              </div>
            </div>
          </div>
          <Button asChild variant='secondary'>
            <Link href='/'>Back to all products</Link>
          </Button>
        </Container>
      </Main>
      <Footer />
    </Fragment>
  )
}

export default ProductPage