import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ComponentProps } from 'react'

type TitleProps = Pick<ComponentProps<'h1'>, 'children' | 'className'> & {
  button?: ComponentProps<'h1'>['children']
}

export default function Title({ children, className, button }: TitleProps) {
  return (
    <h1
      className={cn(
        'text-4xl mb-7 md:text-6xl md:mb-8',
        button && 'flex flex-wrap gap-4 items-center',
        className,
      )}>
      {children}
      {button}
    </h1>
  )
}
