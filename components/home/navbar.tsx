"use client"

import * as React from "react"
import {
  CalendarCheck,
  CalendarPlus,
  Heart,
  LogOut,
  Menu,

  Settings,

  UserRound,
} from "lucide-react"
import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import ThemeToggle from "../theme/ThemeToggle"

const userMenuLinks = [
  { label: "Create Event", href: "/create-event", icon: CalendarPlus },
  { label: "Joined Event", href: "/joined-event", icon: CalendarCheck },
  { label: "Manage Event", href: "/manage-event", icon: Settings },
  { label: "Profile", href: "/profile", icon: UserRound },
]


function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
        <Heart className="size-5" fill="currentColor" />
      </span>

      <span className="flex flex-col leading-tight">
        <span className="font-heading text-lg font-bold text-[#1e1b4b] dark:text-white">
          Kindora
        </span>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground">
          Serve &middot; Support &middot; Solve
        </span>
      </span>
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const { data: session } = authClient.useSession()
  const user = session?.user
  // const filteredLinks =
  //   pathname === "/upcoming-events"
  //     ? navLinks.filter(
  //         (link) => link.href === "/" || link.href === "/upcoming-events"
  //       )
  //     : navLinks;
      
  const handleSignout = async () => {
    await authClient.signOut()
  }
  const isActive = (href: string) => {
    return (
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    )
  }
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href)

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "text-foreground/70 hover:bg-accent hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              {" "}
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label="Open account menu"
                  render={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hidden gap-2 rounded-full px-2 focus-visible:ring-2 focus-visible:ring-primary sm:flex"
                    />
                  }
                >
<Tooltip>
  <TooltipTrigger
    render={
      <Avatar size="sm">
        <AvatarImage
          src={user.image || undefined}
          alt={user.name || "User"}
        />

        <AvatarFallback>
          {user.name?.charAt(0).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
    }
  />

  <TooltipContent>
    <p>{user.name || "User"}</p>
  </TooltipContent>
</Tooltip>

                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {userMenuLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <DropdownMenuItem
                        key={link.label}
                        render={<a href={link.href} />}
                        className="cursor-pointer gap-2"
                      >
                        <Icon className="text-primary" />
                        {link.label}
                      </DropdownMenuItem>
                    )
                  })}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignout}
                    variant="destructive"
                    className="cursor-pointer gap-2"
                  >
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {" "}
              <Link href={"/signup"}>
                {" "}
                <Button className="rounded-full px-5">Sign up</Button>
              </Link>
              <Link href={"/login"}>
                {" "}
                <Button className="rounded-full px-5">Login</Button>
              </Link>
            </>
          )}

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
                <SheetTitle>Kindora</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-4 pb-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href)

                  return (
                    <SheetClose
                      nativeButton={false}
                      key={link.label}
                      render={<Link href={link.href} />}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground/80 hover:bg-accent hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
