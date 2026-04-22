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
    href: "/shop/tops",
    items: [
      { name: "Blouses", href: "/shop/tops?subcategory=blouses" },
      { name: "Shirts", href: "/shop/tops?subcategory=shirts" },
      { name: "Sweaters", href: "/shop/tops?subcategory=sweaters" },
      { name: "Cardigans", href: "/shop/tops?subcategory=cardigans" },
    ],
  },
  {
    name: "Bottoms",
    href: "/shop/bottoms",
    items: [
      { name: "Trousers", href: "/shop/bottoms?subcategory=trousers" },
      { name: "Jeans", href: "/shop/bottoms?subcategory=jeans" },
      { name: "Skirts", href: "/shop/bottoms?subcategory=skirts" },
      { name: "Shorts", href: "/shop/bottoms?subcategory=shorts" },
    ],
  },
  {
    name: "Dresses",
    href: "/shop/dresses",
    items: [
      { name: "Midi Dresses", href: "/shop/dresses?subcategory=midi" },
      { name: "Mini Dresses", href: "/shop/dresses?subcategory=mini" },
      { name: "Maxi Dresses", href: "/shop/dresses?subcategory=maxi" },
    ],
  },
  {
    name: "Outerwear",
    href: "/shop/outerwear",
    items: [
      { name: "Blazers", href: "/shop/outerwear?subcategory=blazers" },
      { name: "Coats", href: "/shop/outerwear?subcategory=coats" },
      { name: "Jackets", href: "/shop/outerwear?subcategory=jackets" },
    ],
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
  { name: "Alterations Services", href: "/book-consultation" },
  { name: "Our Story", href: "#story" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [cartCount] = useState(0)
  const [favoritesCount] = useState(0)
  const isLoggedIn = false // replace with auth logic

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

        <NavigationMenu viewport={false}>
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
        <Button
  asChild
  variant="ghost"
  size="icon"
  className="relative text-muted-foreground hover:text-foreground"
>
  <Link href="/favorites">
    <Heart className="h-5 w-5" />
    <span className="sr-only">Favorites</span>
  </Link>
</Button>

          {/* Shopping Bag */}
        <Button asChild variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Link href="/checkout">
            <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping bag</span>
          </Link>
        </Button>

          {/* User Account */}
          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Link href="/login?redirect=/profile">
              <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
