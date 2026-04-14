"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ShoppingBag, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const clothingCategories = [
  {
    name: "Tops",
    href: "#shop",
    items: [
      { name: "Blouses", href: "#shop" },
      { name: "Shirts", href: "#shop" },
      { name: "T-Shirts", href: "#shop" },
      { name: "Sweaters", href: "#shop" },
      { name: "Cardigans", href: "#shop" },
    ],
  },
  {
    name: "Bottoms",
    href: "#shop",
    items: [
      { name: "Trousers", href: "#shop" },
      { name: "Jeans", href: "#shop" },
      { name: "Skirts", href: "#shop" },
      { name: "Shorts", href: "#shop" },
    ],
  },
  {
    name: "Dresses",
    href: "#shop",
    items: [
      { name: "Midi Dresses", href: "#shop" },
      { name: "Mini Dresses", href: "#shop" },
      { name: "Maxi Dresses", href: "#shop" },
      { name: "Cocktail Dresses", href: "#shop" },
    ],
  },
  {
    name: "Outerwear",
    href: "#shop",
    items: [
      { name: "Blazers", href: "#shop" },
      { name: "Coats", href: "#shop" },
      { name: "Jackets", href: "#shop" },
      { name: "Vests", href: "#shop" },
    ],
  },
  {
    name: "Suits",
    href: "#shop",
    items: [
      { name: "Suit Sets", href: "#shop" },
      { name: "Suit Separates", href: "#shop" },
    ],
  },
  {
    name: "Sales",
    href: "/sales",
  },
  {
    name: "Alteration Services",
    href: "/book-consultation",
  },
]

const mobileNavigation = [
  { name: "Shop All", href: "#shop" },
  { name: "Tops", href: "#shop" },
  { name: "Bottoms", href: "#shop" },
  { name: "Dresses", href: "#shop" },
  { name: "Outerwear", href: "#shop" },
  { name: "Suits", href: "#shop" },
  { name: "Sales", href: "#sales" },
  { name: "Alterations Services", href: "/book-consultation" },
  { name: "Our Story", href: "#story" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [cartCount] = useState(0)
  const [favoritesCount] = useState(0)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">

      {/* Top Header - Logo Centered */}
      <div className="flex justify-center items-center py-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="The Petite Atelier"
            width={150}
            height={90}
            className="h-20 lg:h-24 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Bottom Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8 border-t border-border">

        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="-m-2.5">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background">
              <div className="mt-6">
                {mobileNavigation.map((item) => (
                  <Link key={item.name} href={item.href} className="block px-3 py-2">
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="gap-1">

            {/* Home (always first) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Other categories */}
            {clothingCategories.map((category) => (
              <NavigationMenuItem key={category.name}>
                {category.items ? (
                  <>
                    <NavigationMenuTrigger>
                      {category.name}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid w-48 gap-1 p-3">
                        {category.items.map((item) => (
                          <li key={item.name}>
                            <NavigationMenuLink asChild>
                              <Link href={item.href} className="block px-3 py-2 text-sm">
                                {item.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={category.href}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      {category.name}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}

          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side icons */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Favorites */}
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Favorites</span>
            {favoritesCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                {favoritesCount}
              </span>
            )}
          </Button>

          {/* Shopping Bag */}
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping bag</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
                {cartCount}
              </span>
            )}
          </Button>

          {/* User Account */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </nav>
    </header>
  )
}
