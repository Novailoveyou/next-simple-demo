import {
  AlertDialog as BaseAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ComponentProps } from 'react'

type AlertDialosProps = {
  trigger: ComponentProps<typeof AlertDialogTrigger>['children']
  title: ComponentProps<typeof AlertDialogTitle>['children']
  description: ComponentProps<typeof AlertDialogDescription>['children']
  cancel: ComponentProps<typeof AlertDialogCancel>['children']
  action: ComponentProps<typeof AlertDialogAction>['children']
  actionOnClick: ComponentProps<typeof AlertDialogAction>['onClick']
}

const PROPS = {
  trigger: 'Open',
  title: 'Are you sure?',
  description:
    'This action cannot be undone. This will permanently delete your data',
  cancel: 'Cancel',
  action: 'Continue',
  actionOnClick: () => {},
} as const satisfies AlertDialosProps

export default function AlertDialog({
  trigger = PROPS.trigger,
  title = PROPS.title,
  description = PROPS.description,
  cancel = PROPS.cancel,
  action = PROPS.action,
  actionOnClick = PROPS.actionOnClick,
}: Partial<AlertDialosProps>) {
  return (
    <BaseAlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={actionOnClick}>
            {action}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  )
}
