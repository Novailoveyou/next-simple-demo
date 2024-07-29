'use client'

import {
  NavigationMenu as BaseNavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
import ThemeToggle from './ThemeToggle'

export default function NavigationMenu() {
  return (
    <BaseNavigationMenu>
      <NavigationMenuList className='flex gap-4'>
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </BaseNavigationMenu>
  )
}
