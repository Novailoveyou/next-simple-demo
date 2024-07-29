import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ComponentProps } from 'react'

type ResponsiveImageProps = ComponentProps<typeof Image>

export default function ResponsiveImage({
  className,
  src,
  alt,
  ...imageProps
}: ResponsiveImageProps) {
  return (
    <span className='inline-block max-w-max'>
      <Image
        src={src || ''}
        {...imageProps}
        alt={alt || 'Image'}
        className={cn(className)}
      />
    </span>
  )
}
