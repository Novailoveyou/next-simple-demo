import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ComponentProps } from 'react'

type ResponsiveImageProps = ComponentProps<typeof Image>

export default function ResponsiveImage({
  className,
  alt,
  ...imageProps
}: ResponsiveImageProps) {
  return (
    <span className='inline-block max-w-max'>
      <Image {...imageProps} alt={alt || 'Image'} className={cn(className)} />
    </span>
  )
}
