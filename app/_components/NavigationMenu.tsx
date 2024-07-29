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
import ThemeToggle from '@/app/_components/ThemeToggle'

export default function NavigationMenu() {
  return (
    <BaseNavigationMenu>
      <NavigationMenuList className='flex gap-4'>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </BaseNavigationMenu>
  )
}
