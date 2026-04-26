// app/search/page.tsx

import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/products"

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string }
}) {
    const resolvedParams = await searchParams
    const query = resolvedParams?.q?.trim().toLowerCase() || ""
    console.log("SEARCH PARAMS:", resolvedParams)
    console.log("QUERY:", query)

  const results = query
  ? allProducts.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.subcategory.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    )
  : []
  

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Search results for "{query}"
      </h1>

      {results.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}