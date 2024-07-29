import 'server-only'
import Header from '@/app/_sections/Header'
import Main from '@/app/_sections/Main'
import Footer from '@/app/_sections/Footer'
import Title from '@/app/_components/Title'
import Container from '@/app/_components/Container'
import NewProductForm from '@/app/_components/NewProductForm'

export default async function NewProduct() {
  return (
    <>
      <Header />
      <Main>
        <section>
          <Container>
            <Title>Products</Title>
            <NewProductForm />
          </Container>
        </section>
      </Main>
      <Footer />
    </>
  )
}
