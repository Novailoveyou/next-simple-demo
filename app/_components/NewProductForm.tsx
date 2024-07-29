'use client'
import { useForm } from 'react-hook-form'
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

export default function NewProductForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
    },
  })

  const onSubmit = async (values: FormSchema) => {
    try {
      await createProduct(values)
      form.reset()
      toast('Product created')
    } catch (error) {
      toast('Error while creating the product')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
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
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
