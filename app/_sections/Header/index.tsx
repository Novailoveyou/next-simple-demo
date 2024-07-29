import 'server-only'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import NavigationMenu from './components/NavigationMenu'
import Container from '@/app/_components/Container'
import Link from 'next/link'

type HeaderProps = Pick<ComponentProps<'header'>, 'id' | 'className'>

export default function Header<Props extends HeaderProps>({
  id,
  className,
}: Props) {
  return (
    <header id={id} className={cn(className, 'p-4 mb-2')}>
      <Container className='flex gap-4 justify-between'>
        <Link href='/' className='text-xl'>
          Next.js simple demo
        </Link>
        <NavigationMenu />
      </Container>
    </header>
  )
}
