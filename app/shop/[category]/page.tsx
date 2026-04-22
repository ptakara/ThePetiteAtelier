// app/shop/[category]/page.tsx

import { notFound } from "next/navigation"
import { ProductCard } from "@/components/product-card"

type Product = {
  id: number
  name: string
  category: string
  subcategory: string
  price: number
  image: string
}

const allProducts: Product[] = [
  { id: 5, name: "Silk Ivory Blouse", category: "tops", subcategory: "blouses", price: 85, image: "/images/product-blouse.jpg" },
  { id: 6, name: "Satin Grace Blouse", category: "tops", subcategory: "blouses", price: 65, image: "/images/tops/t1.png" },
  { id: 7, name: "Azure Rib V‑Neck Sweater", category: "tops", subcategory: "sweaters",  price: 42, image: "/images/tops/t16.png"},
  { id: 8, name: "White Fitted Crew-Neck Tee", category: "tops", subcategory: "shirts",  price: 30, image: "/images/tops/t12.png" },
  { id: 9, name: "Pink Oversized Cardigan.", category: "tops", subcategory: "cardigans",  price: 42, image: "/images/tops/t7.png" },
  { id: 10,  name: "Brown Crew‑Neck Tee ", category: "tops", subcategory: "shirts",  price: 28, image: "/images/tops/t9.png" },
  { id: 11,  name: "Short Sleeve Kimono Blouse", category: "tops", subcategory: "blouses", price: 60, image: "/images/tops/t2.png" },
  { id: 12,  name: "Classic Gold Tunic", category: "tops", subcategory: "blouses", price: 55, image: "/images/tops/t3.png" },
  { id: 13,  name: "Black Rib‑Knit Cardigan", category: "tops", subcategory: "cardigans", price: 52, image: "/images/tops/t8.png" },
  { id: 14,  name: "Polka Dot Ruffle Trim Blouse.", category: "tops", subcategory: "blouses",  price: 48, image: "/images/tops/t4.png" },
  { id: 15, name: "Textured Grey Sweater", category: "tops", subcategory: "sweaters", price: 44, image: "/images/tops/t15.png" },  
  { id: 16, name: "Black Satin Cowl‑Neck Tank .", category: "tops", subcategory: "blouses", price: 48, image: "/images/tops/t5.png" },
  { id: 17, name: "White Polished Tank Top.", category: "tops", subcategory: "blouses", price: 70, image: "/images/tops/t6.png" },
  { id: 18, name: "White Clean Vest", category: "tops", subcategory: "blouses", price: 40, image: "/images/tops/t18.png" },
  { id: 19, name: "Flowerly Boatneck Blouse", category: "tops", subcategory: "blouses", price: 55, image: "/images/tops/t10.png" },
  { id: 20, name: "Deep Blue V-Cardigan", category: "tops", subcategory: "cardigans",  price: 50, image: "/images/tops/t13.png" },
  { id: 21, name: "Ivory Stripe Sweater ", category: "tops", subcategory: "sweaters", price: 32, image: "/images/tops/t14.png" },
  { id: 22, name: "Nordic Yoke Cardigan", category: "tops", subcategory: "cardigans", price: 56, image: "/images/tops/t17.png" },
  { id: 23, name: "Charcoal Collar Vest", category: "tops", subcategory: "blouses", price: 45, image: "/images/tops/t19.png" },


  { id: 24, name: "Light Brown Trousers", category: "bottoms", subcategory: "trousers", price: 120, image: "/images/product-trousers.jpg" },
  { id: 25, name: "A-Line Olive Skirt", category: "bottoms", subcategory: "skirts", price: 65, image: "/images/bottoms/b1.png"},
  { id: 26, name: "Light Blue Linen Shorts", category: "bottoms", subcategory: "shorts", price: 45, image: "/images/bottoms/b12.png"},
  { id: 27, name: "Black Ankle Trousers", category: "bottoms", subcategory: "trousers", price: 88, image: "/images/bottoms/b4.png"},
  { id: 28, name: "Flare Jeans Indigo Wash", category: "bottoms", subcategory: "jeans", price: 68, image: "/images/bottoms/b13.png"},
  { id: 29, name: "Grey High-Waisted Trousers", category: "bottoms", subcategory: "trousers", price: 75, image: "/images/bottoms/b3.png"},
  { id: 30, name: "Pleated Taupe Wide-Leg Pant", category: "bottoms", subcategory: "trousers", price: 80, image: "/images/bottoms/b2.png"},
  { id: 31, name: "Olive Paperbag Shorts", category: "bottoms", subcategory: "shorts", price: 40, image: "/images/bottoms/b11.png"},
  { id: 32, name: "Navy Blue Classic Trousers", category: "bottoms", subcategory: "trousers", price: 89, image: "/images/bottoms/b5.png"},
  { id: 33, name: "Midi-Tight Olive Skirt", category: "bottoms", subcategory: "skirts", price: 55, image: "/images/bottoms/b6.png"},
  { id: 34, name: "Dark Wash Wide-Legs Jeans", category: "bottoms", subcategory: "jeans", price: 62, image: "/images/bottoms/b7.png"},
  { id: 35, name: "Beige Classic Belted Shorts", category: "bottoms", subcategory: "shorts", price: 55, image: "/images/bottoms/b9.png"},
  { id: 36, name: "Black Fitted Flare Jeans", category: "bottoms", subcategory: "jeans", price: 65, image: "/images/bottoms/b8.png"},
  { id: 37, name: "Strigid Mom Jeans", category: "bottoms", subcategory: "jeans", price: 45, image: "/images/bottoms/b10.png"},


  { id: 38, name: "Dress", category: "dresses", subcategory: "midi", price: 169, image: "/images/product-dress.jpg" },
  { id: 39, name: "Olive Wrap Midi", category: "dresses", subcategory: "midi", price: 155, image: "/images/dresses/d1.png" },
  { id: 40, name: "Embroidered Honey Gown", category: "dresses", subcategory: "maxi", price: 330, image: "/images/dresses/d9.png" },
  { id: 41, name: "Copper Slip Wrap", category: "dresses", subcategory: "midi", price: 168, image: "/images/dresses/d3.png" },
  { id: 42, name: "Peach Summer Crisscross Maxi", category: "dresses", subcategory: "maxi", price: 330, image: "/images/dresses/d10.png" },
  { id: 43, name: "Black Satin Mini", category: "dresses", subcategory: "mini", price: 50, image: "/images/dresses/d4.png" },
  { id: 44, name: "V-Neckline White Dress", category: "dresses", subcategory: "midi", price: 175, image: "/images/dresses/d2.png" },
  { id: 45, name: "Red Strapless Mini", category: "dresses", subcategory: "mini", price: 45, image: "/images/dresses/d5.png" },
  { id: 46, name: "Forest Corset Gown", category: "dresses", subcategory: "maxi", price: 350, image: "/images/dresses/d8.png" },
  { id: 47, name: "Framed Strapless Mini", category: "dresses", subcategory: "mini", price: 85, image: "/images/dresses/d6.png" },
  { id: 48, name: "Blue Floral Maxi Dress", category: "dresses", subcategory: "maxi", price: 55, image: "/images/dresses/d7.png" },


  { id: 49, name: "Cream Tailored Blazer", category: "outerwear", subcategory: "blazers", price: 210, image: "/images/product-blazer.jpg" },
  { id: 50, name: "Cropped Denim Jacket", category: "outerwear", subcategory: "jackets", price: 45, image: "/images/outerwear/o2.png" },
  { id: 51, name: "Black Tailored Blazer", category: "outerwear", subcategory: "blazers", price: 165, image: "/images/outerwear/o11.png" },
  { id: 52, name: "White Wind Jacket", category: "outerwear", subcategory: "jackets", price: 55, image: "/images/outerwear/o1.png" },
  { id: 53, name: "Navy Longline Coat", category: "outerwear", subcategory: "coats", price: 172, image: "/images/outerwear/o9.png" },
  { id: 54, name: "Midgnight Denim Jacket", category: "outerwear", subcategory: "jackets", price: 42, image: "/images/outerwear/o3.png" },
  { id: 55, name: "Red Sport jacket", category: "outerwear", subcategory: "jackets", price: 55, image: "/images/outerwear/o10.png" },
  { id: 56, name: "Brown Suede Jacket", category: "outerwear", subcategory: "jackets", price: 42, image: "/images/outerwear/o4.png" },
  { id: 57, name: "Maxi Graphite Coat", category: "outerwear", subcategory: "coats", price: 155, image: "/images/outerwear/o7.png" },
  { id: 58, name: "Urban Black Hood Jacket", category: "outerwear", subcategory: "jackets", price: 44, image: "/images/outerwear/o8.png" },

]


interface PageProps {
  params: {
    category: string
  }
  searchParams: {
    subcategory?: string
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const { subcategory } = await searchParams
  
  // Validate category exists
  const validCategories = ["tops", "bottoms", "dresses", "outerwear"]
  if (!validCategories.includes(category)) {
    notFound()
  }
  
  // Filter products by category and optional subcategory
  let filteredProducts = allProducts.filter(
    product => product.category === category
  )
  
  // Apply subcategory filter if provided
  if (subcategory) {
    filteredProducts = filteredProducts.filter(
      product => product.subcategory === subcategory
    )
  }
  
  // Get subcategory display name (capitalize first letter)
  const subcategoryName = subcategory 
    ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
    : null
  
  // Get category display name
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {subcategoryName 
            ? `${subcategoryName}`
            : `${categoryName}`}
        </h1>
        {subcategoryName && (
          <p className="text-muted-foreground mt-2">
            {filteredProducts.length} products in {subcategoryName.toLowerCase()}
          </p>
        )}
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No products found in {subcategory ? subcategory : category}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}