import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Tailored Linen Blazer",
    price: 245,
    image: "/images/product-blazer.jpg",
    category: "outerwear",
  },
  {
    id: 2,
    name: "Classic Midi Dress",
    price: 189,
    image: "/images/product-dress.jpg",
    category: "dresses",
  },
  {
    id: 3,
    name: "High-Waisted Trousers",
    price: 165,
    image: "/images/product-trousers.jpg",
    category: "bottoms",
  },
  {
    id: 4,
    name: "Silk Ivory Blouse",
    price: 145,
    image: "/images/product-blouse.jpg",
    category: "tops",
  },
]


export function ShopSection() {
  return (
    <section id="shop" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-5">
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-3">
              Our Collection
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Perfectly Proportioned
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              Every piece is designed with petite proportions in mind, ensuring a flattering fit without alterations.
            </p>
          </div>
        </div>

        {/* Product grid */}
         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {["Tops", "Bottoms", "Dresses", "Outerwear"].map((category) => (
  <Link
    key={category}
    href={`/shop/${category.toLowerCase()}`}
    className="group flex items-center justify-center py-2 px-6 border border-border rounded-lg hover:border-foreground transition-colors"
  >
    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
      {category}
    </span>
  </Link>
))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice().reverse().map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>

        {/* Categories */}
       
      </div>
    </section>
  )
}
