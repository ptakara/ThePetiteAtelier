"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

interface ProductCardProps {
  name: string
  price: number
  image: string
  category: string
}

export function ProductCard({ name, price, image, category }: ProductCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/5" />
        <Button 
          size="icon" 
          className="absolute bottom-4 right-4 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </div>
      <div className="mt-4">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {category}
        </p>
        <h3 className="mt-1 font-serif text-lg font-medium text-foreground">
          {name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}
