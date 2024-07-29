import 'server-only'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type MainProps = Pick<ComponentProps<'main'>, 'id' | 'className' | 'children'>

export default function Main({ id, className, children }: MainProps) {
  return (
    <main id={id} className={cn(className)}>
      {children}
    </main>
  )
}
