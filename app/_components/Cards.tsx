'use client'
import { getProducts } from '@/app/_actions/getProducts'
import Card from '@/app/_components/Card'
import { useProducts } from '@/app/_store'
import { useEffect } from 'react'

type CardsProps = { products: Awaited<ReturnType<typeof getProducts>> }

export default function Cards({ products }: CardsProps) {
  const { products: _products, setProducts } = useProducts()

  useEffect(() => {
    if (!_products || _products.length === 0) {
      setProducts(products)
    }
  }, [_products, products, setProducts])

  const cards = _products.length === 0 ? products : _products

  console.log('cards: ', cards)

  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-10'>
      {cards.map(product => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  )
}
