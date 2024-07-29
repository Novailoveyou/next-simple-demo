import 'server-only'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import ThemeToggle from '@/app/_components/ThemeToggle'
import NavigationMenu from '@/app/_components/NavigationMenu'
import Container from '@/app/_components/Container'

type HeaderProps = Pick<ComponentProps<'header'>, 'id' | 'className'>

export default function Header<Props extends HeaderProps>({
  id,
  className,
}: Props) {
  return (
    <header id={id} className={cn(className, 'p-4 mb-2')}>
      <Container className='flex gap-4 justify-between'>
        <p className='text-xl'>Next.js simple demo</p>
        <NavigationMenu />
      </Container>
    </header>
  )
}
