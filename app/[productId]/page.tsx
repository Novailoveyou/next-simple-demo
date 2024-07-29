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
import { formatPrice } from '@/app/_utils/formatPrice'

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

  const { id, title, description, category, price, image, rating } = product

  return (
    <Fragment>
      <Header />
      <Main>
        <Container>
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
        </Container>
      </Main>
      <Footer />
    </Fragment>
  )
}

export default ProductPage
