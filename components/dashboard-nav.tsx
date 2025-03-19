"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useWeb3 } from "@/components/web3-provider"
import { cn } from "@/lib/utils"
import { BarChart3, Home, LogOut, Menu, Moon, Settings, Sun, Vote } from "lucide-react"
import { useTheme } from "next-themes"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Vote",
    href: "/vote",
    icon: Vote,
  },
  {
    title: "Results",
    href: "/results",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { disconnect } = useWeb3()
  const { theme, setTheme } = useTheme()

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <div className="px-2 py-6">
            <Link href="/dashboard" className="flex items-center px-2">
              <span className="font-bold">eVoteLedger</span>
            </Link>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)]">
              <div className="flex flex-col space-y-1 p-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-destructive"
                onClick={() => {
                  disconnect()
                  setOpen(false)
                }}
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <nav className="hidden w-[240px] flex-col border-r bg-background px-3 py-4 md:flex">
        <Link href="/dashboard" className="flex items-center px-2 py-2">
          <span className="font-bold">eVoteLedger</span>
        </Link>
        <div className="mt-8 flex flex-1 flex-col space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
        <div className="mt-auto space-y-2 pt-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark Mode
              </>
            )}
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 text-destructive" onClick={disconnect}>
            <LogOut className="h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </nav>
    </>
  )
}

