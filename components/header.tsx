// components/header.tsx

"use client"

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
import { Search } from "lucide-react"
import { useState, useEffect } from "react"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [cartCount, setCartCount] = useState(0)
  const [favoritesCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)  
  const [badgeBounce, setBadgeBounce] = useState(false)


  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])


  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")

      const count = cart.reduce(
        (total: number, item: { quantity?: number }) =>
          total + (item.quantity || 1),
        0
      )
      setCartCount(count)

      setBadgeBounce(true)

      setTimeout(() => {
        setBadgeBounce(false)
      }, 300)
    }

    updateCartCount()
    window.addEventListener("storage", updateCartCount)
    return () => {
      window.removeEventListener("storage", updateCartCount)
    }
  }, [])
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  

  return (
    
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">

      {/* Top Header - Logo Centered */}
      <div className="mx-auto max-w-7xl flex justify-center items-center py-2 px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-10">
          
          {/* Left Image */}
          <Image
            src="/images/left_7.png"
            width={150}
            height={90}
            alt={"left-leaf"}
            className="h-10 lg:h-15 w-auto"
            priority
          />

          {/* Title */}
          <Image
            src="/images/logo_4.png"
            width={200}
            height={100}
            alt={"central-logo"}
            className="h-18 lg:h-23 w-auto"
            priority
          />



          {/* Right Image */}
          <Image
            src="/images/right_7.png"
            width={150}
            height={90}
            alt={"right-leaf"}
            className="h-10 lg:h-15 w-auto"
            priority
          />
        </Link>
      </div>


      {/* Bottom Navbar */}
      <nav className="mx-auto flex max-w-8xl items-center justify-between px-6 py-2 lg:px-8 border-t border-border">

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

                  <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    {category.name}
                  </NavigationMenuTrigger>
        
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-3">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href={category.href}
                            className="block px-3 py-2 text-sm font-small text-foreground"
                          >
                            All {category.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>

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

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center mx-4"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-72 rounded-full border border-border bg-background px-10 py-2 text-sm shadow-sm
              focus:outline-none focus:ring-2 focus:ring-foreground focus:border-foreground"
            />

            {/* magnifying glass icon inside input */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </span>
          </div>
        </form>



        {/* Right Side Icons - FAVORITE / BAG / PROFILE ICONS */}
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
          <Link href="/bag" className="relative">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
             <span
                className={`absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background transition-transform duration-300 ${
                  badgeBounce ? "scale-125" : "scale-100"
                }`}
              >
                {cartCount}
              </span>
            )}

            <span className="sr-only">Shopping bag</span>
          </Link>
        </Button>

          {/* User Account */}
          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Link href={isLoggedIn ? "/profile" : "/login?redirect=/profile"}>
              <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
