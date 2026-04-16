// app/shop/[category]/page.tsx

import { notFound } from "next/navigation"
import { ProductCard } from "@/components/product-card"

type Product = {
  name: string
  category: string
  price: number
  image: string
}

const allProducts: Product[] = [
  { name: "Silk Ivory Blouse", category: "tops", price: 85, image: "/images/product-blouse.jpg" },
  { name: "Satin Grace Blouse", category: "tops", price: 65, image: "/images/t1.png" },
  { name: "Pink Oversized Cardigan.", category: "tops", price: 42, image: "/images/t7.png" },
  { name: "Short Sleeve Kimono Blouse", category: "tops", price: 60, image: "/images/t2.png" },
  { name: "Classic Gold Tunic", category: "tops", price: 55, image: "/images/t3.png" },
  { name: "Polka Dot Ruffle Trim Blouse.", category: "tops", price: 48, image: "/images/t4.png" },
  { name: "Blue Cardigan.", category: "tops", price: 48, image: "/images/t11.png" },
  { name: "Black Satin Cowl‑Neck Tank .", category: "tops", price: 48, image: "/images/t5.png" },
  { name: "White Polished Tank Top.", category: "tops", price: 70, image: "/images/t6.png" },
  { name: "Black Rib‑Knit Cardigan", category: "tops", price: 52, image: "/images/t8.png" },
  { name: "Brown Crew‑Neck Tee ", category: "tops", price: 28, image: "/images/t9.png" },
  { name: "Flowerly Boatneck Blouse", category: "tops", price: 55, image: "/images/t10.png" },
  { name: "White Fitted Crew-Neck Tee", category: "tops", price: 30, image: "/images/t12.png" },


  { name: "Light Brown Trousers", category: "bottoms", price: 120, image: "/images/product-trousers.jpg" },
  { name: "A‑Line Olive Skirt", category: "bottoms", price: 65, image: "/images/b1.png"},
  { name: "Light Blue Linen Shorts", category: "bottoms", price: 45, image: "/images/b12.png"},
  { name: "Pleated Taupe Wide-Leg Pant", category: "bottoms", price: 80, image: "/images/b2.png"},
  { name: "Flare Jeans Indigo Wash", category: "bottoms", price: 68, image: "/images/b13.png"},
  { name: "Grey High-Waisted Trousers", category: "bottoms", price: 75, image: "/images/b3.png"},
  { name: "Black Ankle Trousers", category: "bottoms", price: 88, image: "/images/b4.png"},
  { name: "Olive Paperbag Shorts", category: "bottoms", price: 40, image: "/images/b11.png"},
  { name: "Navy Blue Classic Trousers", category: "bottoms", price: 89, image: "/images/b5.png"},
  { name: "Midi-Tight Olive Skirt", category: "bottoms", price: 55, image: "/images/b6.png"},
  { name: "Dark Wash Wide-Legs Jeans", category: "bottoms", price: 62, image: "/images/b7.png"},
  { name: "Beige Classic Belted Shorts", category: "bottoms", price: 55, image: "/images/b9.png"},
  { name: "Black Fitted Flare Jeans", category: "bottoms", price: 65, image: "/images/b8.png"},
  { name: "Strigid Mom Jeans", category: "bottoms", price: 45, image: "/images/b10.png"},



  { name: "Dress", category: "dresses", price: 169, image: "/images/product-dress.jpg" },
  { name: "Olive Wrap Midi", category: "dresses", price: 155, image: "/images/d1.png" },
  { name: "V-Neckline White Dress", category: "dresses", price: 175, image: "/images/d2.png" },
  { name: " Copper Slip Wrap", category: "dresses", price: 168, image: "/images/d3.png" },


  { name: "Blazer", category: "outerwear", price: 245, image: "/images/product-blazer.jpg" },
]

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  // ✅ Safe async params handling (Next.js 14+)
  const { category } = await params

  const normalizedCategory = category.toLowerCase()

  // ✅ Filter products by category
  const filtered = allProducts.filter(
    (p) => p.category === normalizedCategory
  )

  // ✅ Show 404 if no match
  if (filtered.length === 0) {
    return notFound()
  }

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-serif mb-8 capitalize">
        {normalizedCategory}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  )
}