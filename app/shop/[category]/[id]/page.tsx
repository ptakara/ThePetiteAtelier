//app/shop/[category]/[id]

"use client"
import { use, useEffect, useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { allProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart } from "lucide-react"


type PageProps = {
  params: Promise<{
    category: string
    id: string
  }>
}
export default function ProductDetailsPage({ params }: PageProps) {
  const { category, id } = use(params)

    const product = allProducts.find(
        (item) =>
        item.category === category &&
        String(item.id) === id
    )

    if (!product) {
    notFound()
    }
  
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedLength, setSelectedLength] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showSizeChart, setShowSizeChart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const needsLength = product.category === "bottoms" || product.category === "dresses"


    useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.some((item: any) => item.id === product.id))
    }, [product.id])

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

        let updatedFavorites

        if (isFavorite) {
            updatedFavorites = favorites.filter((item: any) => item.id !== product.id)
            setIsFavorite(false)
        } else {
            updatedFavorites = [...favorites, product]
            setIsFavorite(true)
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    }


    const addToBag = () => {
    if (!selectedSize) {
        alert("Please select a size")
        return
    }

    if (needsLength && !selectedLength) {
        alert("Please select a length")
        return
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const itemToAdd = {
        ...product,
        selectedSize,
        selectedLength: needsLength ? selectedLength : "",
        quantity,
    }

    localStorage.setItem("cart", JSON.stringify([...cart, itemToAdd]))
    window.dispatchEvent(new Event("storage"))
    }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">

    <div className="mb-6 text-sm text-muted-foreground">
    <Link href="/#shop" className="hover:underline">
        Shop
    </Link>

    {" / "}

    <Link
        href={`/shop/${category}`}
        className="hover:underline capitalize"
    >
        {category}
    </Link>

    {" / "}

    <span className="text-foreground">
        {product.name}
    </span>
    </div>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>


        <div className="flex items-start justify-between gap-4">
        <h1 className="text-3xl font-medium">{product.name}</h1>

        <Button
            type="button"
            variant="outline"
            onClick={toggleFavorite}
            className="gap-2"
        >
            <Heart
            className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
            />
            {isFavorite ? "Favorited" : "Add to Favorites"}
        </Button>
        </div>

          <p className="mt-3 text-2xl">${product.price}</p>

          {product.fabric && (
            <p className="mt-4 text-sm text-muted-foreground">
              Fabric: {product.fabric}
            </p>
          )}

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Select Size</p>

            <div className="flex flex-wrap gap-2">
              {product.size?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-md border px-4 py-2 text-sm ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-muted-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {needsLength && product.length && (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium">Select Length</p>

              <div className="flex flex-wrap gap-2">
                {product.length.map((length) => (
                  <button
                    key={length}
                    onClick={() => setSelectedLength(length)}
                    className={`rounded-md border px-4 py-2 text-sm ${
                      selectedLength === length
                        ? "border-black bg-black text-white"
                        : "border-muted-foreground"
                    }`}
                  >
                    {length}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Quantity</p>

            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="rounded-md border px-4 py-2"
            >
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={addToBag} className="mt-8 w-full">
            Add to Bag
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowSizeChart(!showSizeChart)}
            className="mt-4 w-full"
          >
            {showSizeChart ? "Hide Size Chart" : "View Size Chart"}
        </Button>

        {showSizeChart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="relative w-full max-w-5xl rounded-md bg-background p-4 shadow-lg">
            <button
                onClick={() => setShowSizeChart(false)}
                className="absolute right-4 top-3 text-xl"
            >
                ×
            </button>
            <h2 className="mb-4 text-lg font-medium">
                Size Chart
            </h2>

            <div className="max-h-[75vh] overflow-auto rounded-md border">
                <Image
                src="/images/sizeChart.jpg"
                alt="Size chart"
                width={1400}
                height={700}
                className="min-w-[1000px]"
                />
            </div>
            </div>
        </div>
        )}

        </div>
      </div>
    </main>
  )
}