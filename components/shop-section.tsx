//app/components/shop-section.tsx

import Link from "next/link"

const productsHome = [
  {
    id: 1,
    image: "/images/tops_main.png",
    link: "/shop/tops",
  },
  {
    id: 2,
    image: "/images/bottoms_main.png",
    link: "/shop/bottoms",
  },
  {
    id: 3,
    image: "/images/dresses_main.png",
    link: "/shop/dresses",
  },
  {
    id: 4,
    image: "/images/outerwear_main.png",
    link: "/shop/outerwear",
  },
]


export function ShopSection() {
  return (
    <section id="shop" className="scroll-mt-36 py-12 lg:py-9 bg-card">
      <div className="mx-auto max-w-6x1 px-6 lg:px-5">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2">
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-1">
              Our Collection
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Perfectly Proportioned
            </h2>
            <p className="mt-4 text-muted-foreground ">
              Every piece is designed with petite proportions in mind, ensuring a flattering fit without alterations.
            </p>
          </div>
        </div>

        {/* Product grid */}
         <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {productsHome.map((item) => (
            <Link key={item.id} href={item.link}>
              <div className="group relative overflow-hidden rounded-lg cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
