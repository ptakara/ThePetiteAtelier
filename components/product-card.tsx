//components/product-card.tsx

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingBag } from "lucide-react"


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
  showDetails?: boolean 
}


export function ProductCard({ product, showFavorite = true, showDetails = true,  }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [showSizePopup, setShowSizePopup] = useState(false)
  const [selectedLength, setSelectedLength] = useState("")
  const [selectedSize, setSelectedSize] = useState("")


  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.some((item: Product) => item.id === product.id))

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setIsInCart(cart.some((item: Product) => item.id === product.id))
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

  const openSizePopup = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setSelectedLength("")
    setSelectedSize("")
    setShowSizePopup(true)
  }

  const addToCartWithSizeAndLength = (selectedLength: string) => {
    if (!selectedSize) return

    const lengthToSave =
      product.length && product.length.length > 1
        ? selectedLength
        : product.length?.[0] || "Regular"

    if (!lengthToSave) return

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const existingIndex = cart.findIndex(
      (item: Product & { selectedSize: string; selectedLength?: string }) =>
        item.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedLength === lengthToSave
    )

    let updatedCart

    if (existingIndex !== -1) {
      updatedCart = [...cart]
      updatedCart[existingIndex].quantity =
        (updatedCart[existingIndex].quantity || 1) + 1
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          selectedSize,
          selectedLength: lengthToSave,
          quantity: 1,
        },
      ]
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("storage"))

    setIsInCart(true)
    setShowSizePopup(false)
  }



  return (
   <Link href={`/shop/${product.category}/${product.id}`}>
      <div className="group relative">

    {/* Heart Icon (top right) */}
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

    {/* Bag Icon (bottom right) */}
    {showDetails && ( 
      <button
        onClick={openSizePopup}
        className="absolute bottom-3 right-3 z-10 rounded-full bg-background/90 p-2 shadow hover:scale-110 transition"
      >
        <ShoppingBag
          className={`h-5 w-5 ${
            isInCart ? "h-5 w-5 text-foreground" : "text-foreground"
          }`}
        />
      </button>
    )}

    {/* Bag Icon POPUP SIZES */}
    {showSizePopup && (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-lg"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setShowSizePopup(false)
      }}
    >
    <div
      className="bg-background rounded-md p-2.5 shadow-lg w-40"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      <h4 className="text-xs font-medium mb-0 text-center">
        Select Size
      </h4>

       {/* POPUP size*/}
      <div className="grid grid-cols-3 gap-1">
        {product.size?.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`border rounded-sm py-1 text-xs transition ${
              selectedSize === size
              ? "bg-foreground text-background"
              : "hover:bg-foreground hover:text-background"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      
      {/* POPUP length*/}
      {product.length && product.length.length > 1 && (
      <>
        <h4 className="text-xs font-medium mt-2 mb-0 text-center">
          Select Length
        </h4>

        <div className="space-y-1 mb-1">
          {product.length.map((length) => (
            <button
              key={length}
              onClick={() => addToCartWithSizeAndLength(length)}
              className={`w-full border rounded-sm py-1 text-xs transition ${
                selectedLength === length
                  ? "bg-foreground text-background"
                  : "hover:bg-foreground hover:text-background"
              }`}
            >
              {length}
            </button>
          ))}
        </div>
      </>
      )}

      {/* POPUP for items with regular size, so an Add to Bag button is added*/}
      {product.length && product.length.length === 1 && selectedSize && (
        <button
          onClick={() => addToCartWithSizeAndLength(product.length![0])}
          className="mt-4 w-full rounded-md bg-foreground text-background py-2 text-sm"
        >
          Add to Bag
        </button>
      )}

      <button
        onClick={() => setShowSizePopup(false)}
        className="w-full text-sm text-muted-foreground hover:underline"
      >
        Cancel
      </button>
    </div>
    </div>
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

        {showDetails && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-foreground">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              ${product.price}
            </p>
          </div>
        )}
        
      </div>
    </Link>
  )
}