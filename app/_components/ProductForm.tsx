'use client'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createProduct } from '@/app/_actions/createProduct'
import { updateProduct } from '@/app/_actions/updateProduct'
import { removeProduct } from '@/app/_actions/removeProduct'
import useSWRMutation from 'swr/mutation'
import { cn } from '@/lib/utils'
import { Product } from '@/app/_types'
import { useRouter } from 'next/navigation'
import AlertDialog from '@/app/_components/AlertDialog'
import { useState } from 'react'

const formSchema = z.object({
  title: z
    .string()
    .min(4, { message: 'Title must be at least 4 characters' })
    .max(80, { message: 'Title must be no longer than 80 characters' }),
  description: z
    .string()
    .min(30, { message: 'Description must be at least 30 characters' })
    .max(400, { message: 'Description must be no longer than 400 characters' }),
  price: z.coerce
    .number()
    .gte(1, { message: 'Price must be at least 1' })
    .lte(1_000_000_000, { message: 'Price must be lower than 1,000,000,000' }),
})

export type FormSchema = z.infer<typeof formSchema>

type ProductFormProps = Pick<
  Required<Parameters<typeof useForm<FormSchema>>>['0'],
  'defaultValues'
> & {
  productId?: Product['id']
}

const PRODUCT_FORM = {
  productId: NaN,
  defaultValues: {
    title: '',
    description: '',
    price: 0,
  },
} as const satisfies ProductFormProps

export default function ProductForm({
  productId = PRODUCT_FORM.productId,
  defaultValues = PRODUCT_FORM.defaultValues,
}: ProductFormProps) {
  const { replace } = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const { isMutating: isCreating, trigger: create } = useSWRMutation(
    ['create-product' as const, form],
    onCreate,
  )

  const { isMutating: isUpdating, trigger: update } = useSWRMutation(
    ['update-product' as const, productId],
    onUpdate,
  )

  const routeToHome = () => replace('/')

  const { isMutating: isRemoving, trigger: remove } = useSWRMutation(
    ['remove-product' as const, form, routeToHome],
    onRemove,
  )

  const isCreatingOrUpdating = isCreating || isUpdating

  const isMutating = isCreatingOrUpdating || isRemoving

  const isProduct = !Number.isNaN(productId)

  const action = isProduct ? update : create

  const handleRemove = async () => isProduct && (await remove(productId))

  return (
    <Form {...form}>
      {/* @ts-expect-error trigger optional second arguments conflict & not used in here so it's fine */}
      <form onSubmit={form.handleSubmit(action)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          disabled={isMutating}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='New product' {...field} />
              </FormControl>
              <FormDescription>This is your product title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          disabled={isMutating}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder='New description...' {...field} />
              </FormControl>
              <FormDescription>
                This is your product description
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='price'
          disabled={isMutating}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type='number' placeholder='1000' {...field} />
              </FormControl>
              <FormDescription>This is your product price</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-wrap gap-4'>
          <Button
            type='submit'
            disabled={isMutating}
            className={cn(isCreatingOrUpdating && 'cursor-wait')}>
            {(isCreatingOrUpdating && 'Loading...') || isProduct
              ? 'Update product'
              : 'Create product'}
          </Button>
          {isProduct && (
            <AlertDialog
              actionOnClick={handleRemove}
              description='This action cannot be undone. This will permanently delete this product'
              trigger={
                <Button
                  type='button'
                  disabled={isMutating}
                  variant='destructive'
                  className={cn(isRemoving && 'cursor-wait')}>
                  {(isRemoving && 'Removing...') || 'Remove product'}
                </Button>
              }
            />
          )}
        </div>
      </form>
    </Form>
  )
}

async function onCreate(
  [url, form]: ['create-product', UseFormReturn<FormSchema>],
  { arg }: { arg: FormSchema },
) {
  try {
    await createProduct(arg)
    form.reset()
    toast('Product created')
  } catch (error) {
    toast('Error while creating the product')
  }
}

async function onUpdate(
  [url, id]: ['update-product', Product['id']],
  { arg: body }: { arg: FormSchema },
) {
  try {
    await updateProduct(id, body)
    toast('Product updated')
  } catch (error) {
    toast('Error while updating the product')
  }
}

async function onRemove(
  [url, form, routeToHome]: [
    'remove-product',
    UseFormReturn<FormSchema>,
    () => void,
  ],
  { arg: productId }: { arg: Product['id'] },
) {
  try {
    await removeProduct(productId)
    form.reset()
    toast('Product deleted')
    routeToHome()
  } catch (error) {
    toast('Error while deleting the product')
  }
}
