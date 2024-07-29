'use client'
import { ComponentProps } from 'react'
import { toast } from 'sonner'
import { SWRConfig } from 'swr'

type Props = ComponentProps<typeof SWRConfig>

const SLOW_NETWORK_ID = '37b4b728-1ac4-48ce-870c-eb0fdf693f64'

const VALUE = {
  // dedupingInterval: 2000
  revalidateOnReconnect: true,
  revalidateOnFocus: true,
  shouldRetryOnError: true,
  errorRetryInterval: 5000,
  errorRetryCount: 3,
  loadingTimeout: 3000,
  onLoadingSlow: () => {
    toast('Slow network detected. Loading, please wait...', {
      id: SLOW_NETWORK_ID,
    })
  },
  onSuccess: () => {
    toast.dismiss(SLOW_NETWORK_ID)
  },
  onError: () => {},
} as const satisfies Props['value']

/** @see https://swr.vercel.app/docs/global-configuration */
export default function SWRProvider({ children }: Pick<Props, 'children'>) {
  return <SWRConfig value={VALUE}>{children}</SWRConfig>
}
