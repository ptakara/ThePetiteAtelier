"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

type Product = {
  id: number
  name: string
  category: string
  subcategory: string
  price: number
  image: string
  size?: string[]
  length?: string[]
  color?: string
  fabric?: string
}

type ProductCardProps = {
  product: Product
   showFavorite?: boolean 
}


export function ProductCard({ product, showFavorite = true }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.some((item: Product) => item.id === product.id))
  }, [product.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    let updatedFavorites

    if (isFavorite) {
      updatedFavorites = favorites.filter((item: Product) => item.id !== product.id)
      setIsFavorite(false)
    } else {
      updatedFavorites = [...favorites, product]
      setIsFavorite(true)
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  return (
    <Link href={`/product/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, "-"))}`}>
      <div className="group relative">

        {/* Heart Icon */}
        {showFavorite && (
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-10 rounded-full bg-background/90 p-2 shadow hover:scale-110 transition"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
              }`}
            />
          </button>
        )}

        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  )
}