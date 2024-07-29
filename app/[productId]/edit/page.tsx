import 'server-only'
import Header from '@/app/_sections/Header'
import Main from '@/app/_sections/Main'
import Footer from '@/app/_sections/Footer'
import Title from '@/app/_components/Title'
import Container from '@/app/_components/Container'
import ProductForm from '@/app/_components/ProductForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Revalidate } from '@/app/_types'
import { ONE_HOUR_IN_SECONDS } from '@/app/_constants'
import { NextPage } from 'next'
import { getProductStaticParams } from '@/app/_actions/getProductStaticParams'
import { getProduct } from '@/app/_actions/getProduct'

type EditProductPageProps = {
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

const EditProductPage: NextPage<EditProductPageProps> = async ({
  params: { productId },
}) => {
  const product = await getProduct({ productId })

  if (!product) throw new Error('Product is null')

  const { id, title, description, price } = product

  return (
    <>
      <Header />
      <Main>
        <section>
          <Container>
            <Title
              button={
                <Button asChild variant='ghost'>
                  <Link href='/'>Back to all products</Link>
                </Button>
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
          </Container>
        </section>
      </Main>
      <Footer />
    </>
  )
}

export default EditProductPage
