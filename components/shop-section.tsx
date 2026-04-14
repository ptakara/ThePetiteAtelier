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
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Classic Midi Dress",
    price: 189,
    image: "/images/product-dress.jpg",
    category: "Dresses",
  },
  {
    id: 3,
    name: "High-Waisted Trousers",
    price: 165,
    image: "/images/product-trousers.jpg",
    category: "Bottoms",
  },
  {
    id: 4,
    name: "Silk Ivory Blouse",
    price: 145,
    image: "/images/product-blouse.jpg",
    category: "Tops",
  },
]

export function ShopSection() {
  return (
    <section id="shop" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
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
          <Button asChild variant="outline" className="w-fit border-foreground text-foreground hover:bg-foreground hover:text-background">
            <Link href="#shop">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Categories */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Dresses", "Tops", "Bottoms", "Outerwear"].map((category) => (
            <Link
              key={category}
              href="#shop"
              className="group flex items-center justify-center py-4 px-6 border border-border rounded-lg hover:border-foreground transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {category}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
