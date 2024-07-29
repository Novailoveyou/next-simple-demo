import 'server-only'
import Header from '@/app/_sections/Header'
import Main from '@/app/_sections/Main'
import Footer from '@/app/_sections/Footer'
import Title from '@/app/_components/Title'
import Container from '@/app/_components/Container'
import ProductForm from '@/app/_components/ProductForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function NewProduct() {
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
              New Product
            </Title>
            <ProductForm />
          </Container>
        </section>
      </Main>
      <Footer />
    </>
  )
}
