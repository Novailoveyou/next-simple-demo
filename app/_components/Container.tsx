import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type ContainerProps = Pick<ComponentProps<'div'>, 'children' | 'className'>

export default function Container<Props extends ContainerProps>({
  className,
  children,
}: Props) {
  return <div className={cn(className, 'container')}>{children}</div>
}
