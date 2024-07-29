import {
  Card as BaseCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getProducts } from '@/app/_actions/getProducts'
import Link from 'next/link'
import ResponsiveImage from './ResponsiveImage'
import { Button } from '@/components/ui/button'

type CardProps = Awaited<ReturnType<typeof getProducts>>[number]

export default function Card({
  id,
  title,
  description,
  category,
  price,
  image,
  rating,
}: CardProps) {
  return (
    <BaseCard className='flex flex-col justify-between items-center p-6 gap-4'>
      <CardHeader>
        <ResponsiveImage
          className='rounded-xl'
          src={image}
          alt={title}
          width={209}
          height={300}
        />
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild size='lg'>
          <Link href={`/${id}`}>Go to product</Link>
        </Button>
      </CardFooter>
    </BaseCard>
  )
}
