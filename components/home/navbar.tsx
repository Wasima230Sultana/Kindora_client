"use client"

import * as React from "react"
import { Heart, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { avatarImages, navLinks } from "@/lib/data"
import { cn } from "@/lib/utils"

// Client-only snapshot: false during SSR/hydration, true after — avoids the
// banned setState-in-effect "mounted" pattern while still preventing a
// theme-icon hydration mismatch (next-themes resolves the theme client-side).
const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )
  const isDark = mounted && resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
        <Heart className="size-5" fill="currentColor" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-lg font-bold text-[#1e1b4b] dark:text-white">
          CommunityHub
        </span>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
          Serve &middot; Support &middot; Solve
        </span>
      </span>
    </a>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={index === 0 ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                index === 0
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Avatar size="sm" className="hidden sm:flex">
            <AvatarImage src={avatarImages[0]} alt="Your profile" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <Button className="rounded-full px-5">Login</Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>CommunityHub</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-4">
                {navLinks.map((link, index) => (
                  <SheetClose
                    key={link.label}
                    render={<a href={link.href} />}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      index === 0
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/80 hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
