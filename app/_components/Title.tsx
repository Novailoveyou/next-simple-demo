import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ComponentProps } from 'react'

type TitleProps = Pick<ComponentProps<'h1'>, 'children' | 'className'> & {
  button?: ComponentProps<'h1'>['children']
}

export default function Title<Props extends TitleProps>({
  children,
  className,
  button,
}: Props) {
  return (
    <h1
      className={cn(
        'text-6xl mb-8',
        button && 'flex flex-wrap gap-6 items-center',
        className,
      )}>
      {children} {button}
    </h1>
  )
}
