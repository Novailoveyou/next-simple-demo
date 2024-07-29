import 'server-only'
import Image from 'next/image'
import Header from '@/app/_sections/Header'
import Main from '@/app/_sections/Main'
import Footer from '@/app/_sections/Footer'
import { Revalidate } from '@/app/_types'
import { ONE_HOUR_IN_SECONDS } from '@/app/_constants'
import { getProducts } from '@/app/_actions/getProducts'
import Card from '@/app/_components/Card'
import Title from '@/app/_components/Title'
import Container from '@/app/_components/Container'

/**
 * @description To revalidate data at a timed interval, you can use the `next.revalidate` option of fetch to set the cache lifetime of a resource (in seconds)
 *
 * @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data */
export const revalidate: Revalidate = ONE_HOUR_IN_SECONDS

export default async function Home() {
  const products = await getProducts({ limit: 16 })

  return (
    <>
      <Header />
      <Main>
        <section>
          <Container>
            <Title>Products</Title>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-10'>
              {products.map(product => (
                <Card key={product.id} {...product} />
              ))}
            </div>
          </Container>
        </section>
      </Main>
      <Footer />
    </>
  )
}
