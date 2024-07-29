import 'server-only'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import Container from '@/app/_components/Container'

type FooterProps = Pick<ComponentProps<'footer'>, 'id' | 'className'>

export default function Footer({ id, className }: FooterProps) {
  return (
    <footer id={id} className={cn('mt-5', className)}>
      <Container className='flex gap-4 justify-between'>
        <p>&copy; all rights reserved</p>
      </Container>
    </footer>
  )
}
