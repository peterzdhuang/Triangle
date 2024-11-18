'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Utensils, Bell, LogIn } from 'lucide-react'
import { ModeToggle } from "@/components/component/dark-mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TaskBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    
    router.push('/login')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  /*
    TODO
    Implement the login button change, 
    when user is logged in, they should see their pfp
    instead of the login button

    maybe pass in a prop

  */
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
       <Link href="/">
        <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80">
            <Utensils className="h-8 w-8 text-primary dark:text-primary-400" />
            <span className="text-2xl font-bold text-primary dark:text-primary-400">Triangle</span>
        </div>
       </Link>

      <nav className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <ModeToggle />
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={handleLogin} variant="ghost" size="sm">
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        )}
      </nav>
    </header>
  )
}