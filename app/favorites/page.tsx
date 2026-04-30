//app/favorites/page.tsx

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

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

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showSizePopup, setShowSizePopup] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    )

    setFavorites(storedFavorites)
  }, [])

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id)

    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const openSizePopup = (product: Product) => {
    setSelectedProduct(product)
    setSelectedSize("")
    setShowSizePopup(true)
  }

  {/* Recommendations logic*/}
  const favoriteSubcategories = favorites.map((item) => item.subcategory)
  const favoriteIds = favorites.map((item) => item.id)

  const recommendedProducts = allProducts
    .filter((product) => favoriteSubcategories.includes(product.subcategory))
    .filter((product) => !favoriteIds.includes(product.id))
    .slice(0, 8)




  const moveToBagWithSizeAndLength = (selectedLength: string) => {
    if (!selectedProduct || !selectedSize) return

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")

    const existingIndex = existingCart.findIndex(
      (item: Product & { selectedSize: string; selectedLength?: string }) =>
        item.id === selectedProduct.id &&
        item.selectedSize === selectedSize &&
        item.selectedLength === selectedLength
    )

    let updatedCart

    if (existingIndex !== -1) {
      updatedCart = [...existingCart]
      updatedCart[existingIndex].quantity =
        (updatedCart[existingIndex].quantity || 1) + 1
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...selectedProduct,
          selectedSize,
          selectedLength,
          quantity: 1,
        },
      ]
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("storage"))

    removeFavorite(selectedProduct.id)

    setSelectedProduct(null)
    setSelectedSize("")
    setShowSizePopup(false)
  }



  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Favorites
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Items you saved for later.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border bg-card px-6 text-center">
          <Heart className="mb-4 h-10 w-10 text-muted-foreground" />

          <h2 className="text-xl font-medium">
            No favorites yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Save items you love by clicking the heart icon on any product.
          </p>

          <Button asChild className="mt-6">
            <Link href="/shop/tops">
              Start Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {favorites.map((product) => (
            <div key={product.id} className="group relative">
             <Link href={`/shop/${product.category}/${product.id}`}>
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-medium text-foreground">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    ${product.price}
                  </p>

                  <p className="mt-1 text-xs uppercase text-muted-foreground">
                    {product.category} / {product.subcategory}
                  </p>
                </div>
              </Link>

              <div className="mt-4 flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  className="flex-1 h-8 text-xs"
                  onClick={() => openSizePopup(product)}
                >
                  Move to Bag
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeFavorite(product.id)}
                  className="flex-1 h-8 text-xs gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove
                </Button>
              </div>

            </div>
          ))}
        </div>
      )}

      {showSizePopup && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-lg bg-background p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-center">
              Select Size
            </h2>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              {selectedProduct.name}
            </p>

            {/* SIZE OPTIONS */}
            <p className="mt-5 mb-2 text-xs text-muted-foreground">
              Select Size
            </p>

            <div className="grid grid-cols-3 gap-2">
              {(selectedProduct.size && selectedProduct.size.length > 0
                ? selectedProduct.size
                : ["XXS", "XS", "S", "M", "L", "XL"]
              ).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border py-2 text-sm transition ${
                    selectedSize === size
                      ? "bg-foreground text-background"
                      : "hover:bg-foreground hover:text-background"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {selectedProduct.length &&
              !(selectedProduct.length.length === 1 && selectedProduct.length[0] === "Regular") && (
                <>
                  <p className="mt-5 mb-2 text-xs text-muted-foreground">
                    Select Length
                  </p>

                  <div className="space-y-2">
                    {selectedProduct.length.map((length) => (
                      <button
                        key={length}
                        disabled={!selectedSize}
                        onClick={() => moveToBagWithSizeAndLength(length)}
                        className={`w-full rounded-md border py-2 text-sm transition ${
                          !selectedSize
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-foreground hover:text-background"
                        }`}
                      >
                        {length}
                      </button>
                    ))}
                  </div>
                </>
            )}

            {selectedProduct.length &&
              selectedProduct.length.length === 1 &&
              selectedProduct.length[0] === "Regular" &&
              selectedSize && (
                <button
                  onClick={() => moveToBagWithSizeAndLength("Regular")}
                  className="mt-4 w-full rounded-md bg-foreground text-background py-2 text-sm"
                >
                  Add to Bag
                </button>
            )}

            <button
              onClick={() => {
                setSelectedProduct(null)
                setShowSizePopup(false)
              }}
              className="mt-4 w-full text-sm text-muted-foreground hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


      {/* Recommendations Card*/}
      {recommendedProducts.length > 0 && (
        <div className="mt-18">
          <h2 className="text-2xl font-semibold">
            Recommended For You
          </h2>

          <div className="mt-5 flex gap-6 overflow-x-auto overflow-y-hidden pb-4">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="w-[100px] min-w-[100px] max-w-[150px] sm:w-[170px] sm:min-w-[170px] sm:max-w-[170px] lg:w-[180px] lg:min-w-[180px] lg:max-w-[180px] flex-shrink-0"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>





  )
}