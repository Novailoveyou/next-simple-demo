import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type ContainerProps = Pick<ComponentProps<'div'>, 'children' | 'className'>

export default function Container({ className, children }: ContainerProps) {
  return <div className={cn(className, 'container')}>{children}</div>
}
