//app/shop/[category]/page.tsx

import { notFound } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/products"
import { ProductFilters } from "@/components/products-filters"

interface PageProps {
  params: Promise<{
    category: string
  }>
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params

  const sp = searchParams ? await searchParams : {}

  const subcategory =
    typeof sp.subcategory === "string" ? sp.subcategory : undefined

  const color =
    typeof sp.color === "string" ? sp.color : undefined

  const size =
    typeof sp.size === "string" ? sp.size : undefined

  const fabric =
    typeof sp.fabric === "string" ? sp.fabric : undefined

  const length =
    typeof sp.length === "string" ? sp.length : undefined
    

  const validCategories = ["tops", "bottoms", "dresses", "outerwear"]

  if (!validCategories.includes(category)) {
    notFound()
  }

  let filteredProducts = allProducts.filter(
    (product) => product.category === category
  )

  if (subcategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.subcategory === subcategory
    )
  }

const colors =
  typeof sp.color === "string"
    ? sp.color.split(",").map(c => c.trim().toLowerCase())
    : undefined

if (colors?.length) {
  filteredProducts = filteredProducts.filter(product =>
    colors.includes(product.color.toLowerCase())
  )
}

const sizes =
  typeof sp.size === "string"
    ? sp.size.split(",").map(s => s.trim())
    : undefined

if (sizes?.length) {
  filteredProducts = filteredProducts.filter(product =>
    product.size.some(s => sizes.includes(s))
  )
}

const fabrics =
  typeof sp.fabric === "string"
    ? sp.fabric.split(",").map(f => f.trim().toLowerCase())
    : undefined

if (fabrics?.length) {
  filteredProducts = filteredProducts.filter(product =>
    fabrics.includes(product.fabric.toLowerCase())
  )
}
const lengths =
  typeof sp.length === "string"
    ? sp.length.split(",").map(l => l.trim())
    : undefined

if (lengths?.length) {
  filteredProducts = filteredProducts.filter(product =>
    product.length.some(l => lengths.includes(l))
  )
}


  const subcategoryName = subcategory
    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
    : null

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex gap-8">

        {/* LEFT SIDEBAR */}
        <aside className="hidden md:block w-64">
          <ProductFilters />
        </aside>

        {/* RIGHT CONTENT */}
        <div className="flex-1">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {subcategoryName ?? categoryName}
            </h1>
          </div>

          {/* PRODUCTS */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}