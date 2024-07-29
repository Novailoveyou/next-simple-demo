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
import { formatPrice } from '@/app/_utils/formatPrice'

type CardProps = Awaited<ReturnType<typeof getProducts>>[number]

export default function Card({ id, title, price, image }: CardProps) {
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
        <CardDescription className='text-xl'>
          {formatPrice(price)}
        </CardDescription>
      </CardContent>
      <CardFooter className='flex flex-wrap gap-4'>
        <Button asChild size='lg'>
          <Link href={`/${id}`}>View</Link>
        </Button>
        <Button asChild size='lg' variant='secondary'>
          <Link href={`/${id}/edit`}>Edit</Link>
        </Button>

        {/* <Button asChild size='lg' variant='destructive'>
          <Link href={`/${id}`}>Delete</Link>
        </Button> */}
      </CardFooter>
    </BaseCard>
  )
}
