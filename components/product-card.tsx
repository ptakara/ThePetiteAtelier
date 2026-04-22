// components/product-card.tsx
import Image from "next/image"
import Link from "next/link"

type Product = {
  name: string
  category: string
  subcategory: string
  price: number
  image: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}>
      <div className="group relative">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">${product.price}</p>
        </div>
      </div>
    </Link>
  )
}