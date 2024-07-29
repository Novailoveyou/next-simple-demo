import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type TitleProps = Pick<ComponentProps<'h1'>, 'children' | 'className'>

export default function Title<Props extends TitleProps>({
  children,
  className,
}: Props) {
  return <h1 className={cn('text-6xl mb-8', className)}>{children}</h1>
}
