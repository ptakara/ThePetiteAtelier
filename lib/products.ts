// lib/products.ts

export type Product = {
  id: number
  name: string
  category: string
  subcategory: string
  price: number
  image: string
  size: string[]
  length: string[]
  color: string
  fabric: string
  
}

export const allProducts: Product[] = [
  { id: 6, name: "Satin Grace Blouse", category: "tops", subcategory: "blouses", price: 65, image: "/images/tops/t1.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Beige", fabric: "Satin" },
  { id: 7, name: "Azure Rib V-Neck Sweater", category: "tops", subcategory: "sweaters", price: 42, image: "/images/tops/t16.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Blue", fabric: "Wool Blend" },
  { id: 8, name: "White Fitted Crew-Neck Tee", category: "tops", subcategory: "shirts", price: 30, image: "/images/tops/t12.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "White", fabric: "Cotton" },
  { id: 9, name: "Pink Oversized Cardigan.", category: "tops", subcategory: "cardigans", price: 42, image: "/images/tops/t7.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Pink", fabric: "Wool Blend" },
  { id: 10, name: "Brown Crew-Neck Tee ", category: "tops", subcategory: "shirts", price: 28, image: "/images/tops/t9.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Brown", fabric: "Cotton" },
  { id: 11, name: "Short Sleeve Kimono Blouse", category: "tops", subcategory: "blouses", price: 60, image: "/images/tops/t2.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "White", fabric: "Cotton" },
  { id: 12, name: "Classic Gold Tunic", category: "tops", subcategory: "blouses", price: 55, image: "/images/tops/t3.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Gold", fabric: "Silk" },
  { id: 13, name: "Black Rib-Knit Cardigan", category: "tops", subcategory: "cardigans", price: 52, image: "/images/tops/t8.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Black", fabric: "Wool Blend" },
  { id: 14, name: "Polka Dot Ruffle Trim Blouse.", category: "tops", subcategory: "blouses", price: 48, image: "/images/tops/t4.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "White", fabric: "Cotton" },
  { id: 15, name: "Textured Grey Sweater", category: "tops", subcategory: "sweaters", price: 44, image: "/images/tops/t15.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Grey", fabric: "Wool Blend" },
  { id: 16, name: "Black Satin Cowl-Neck Tank .", category: "tops", subcategory: "blouses", price: 48, image: "/images/tops/t5.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Black", fabric: "Satin" },
  { id: 17, name: "White Polished Tank Top.", category: "tops", subcategory: "blouses", price: 70, image: "/images/tops/t6.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "White", fabric: "Cotton" },
  { id: 18, name: "White Clean Vest", category: "tops", subcategory: "blouses", price: 40, image: "/images/tops/t18.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "White", fabric: "Cotton" },
  { id: 19, name: "Flowerly Boatneck Blouse", category: "tops", subcategory: "blouses", price: 55, image: "/images/tops/t10.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "White", fabric: "Cotton" },
  { id: 20, name: "Deep Blue V-Cardigan", category: "tops", subcategory: "cardigans", price: 50, image: "/images/tops/t13.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Blue", fabric: "Wool Blend" },
  { id: 21, name: "Ivory Stripe Sweater ", category: "tops", subcategory: "sweaters", price: 32, image: "/images/tops/t14.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "White", fabric: "Wool Blend" },
  { id: 22, name: "Nordic Yoke Cardigan", category: "tops", subcategory: "cardigans", price: 56, image: "/images/tops/t17.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "blue", fabric: "Wool Blend" },
  { id: 23, name: "Charcoal Collar Vest", category: "tops", subcategory: "blouses", price: 45, image: "/images/tops/t19.png", size: ["XXS","XS","S","M","L"], length: ["Regular"], color: "Black", fabric: "Cotton" },

  { id: 25, name: "A-Line Olive Skirt", category: "bottoms", subcategory: "skirts", price: 65, image: "/images/bottoms/b1.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Green", fabric: "Cotton Blend" },
  { id: 26, name: "Light Blue Linen Shorts", category: "bottoms", subcategory: "shorts", price: 45, image: "/images/bottoms/b12.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Blue", fabric: "Linen" },
  { id: 27, name: "Black Ankle Trousers", category: "bottoms", subcategory: "trousers", price: 88, image: "/images/bottoms/b4.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Black", fabric: "Cotton Blend" },
  { id: 28, name: "Flare Jeans Indigo Wash", category: "bottoms", subcategory: "jeans", price: 68, image: "/images/bottoms/b13.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Blue", fabric: "Denim" },
  { id: 29, name: "Grey High-Waisted Trousers", category: "bottoms", subcategory: "trousers", price: 75, image: "/images/bottoms/b3.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Grey", fabric: "Cotton Blend" },
  { id: 30, name: "Pleated Taupe Wide-Leg Pant", category: "bottoms", subcategory: "trousers", price: 80, image: "/images/bottoms/b2.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Beige", fabric: "Cotton Blend" },
  { id: 31, name: "Olive Paperbag Shorts", category: "bottoms", subcategory: "shorts", price: 40, image: "/images/bottoms/b11.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Green", fabric: "Cotton Blend" },
  { id: 32, name: "Navy Blue Classic Trousers", category: "bottoms", subcategory: "trousers", price: 89, image: "/images/bottoms/b5.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Blue", fabric: "Cotton Blend" },
  { id: 33, name: "Midi-Tight Olive Skirt", category: "bottoms", subcategory: "skirts", price: 55, image: "/images/bottoms/b6.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Green", fabric: "Cotton Blend" },
  { id: 34, name: "Dark Wash Wide-Legs Jeans", category: "bottoms", subcategory: "jeans", price: 62, image: "/images/bottoms/b7.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Blue", fabric: "Denim" },
  { id: 35, name: "Beige Classic Belted Shorts", category: "bottoms", subcategory: "shorts", price: 55, image: "/images/bottoms/b9.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Beige", fabric: "Cotton Blend" },
  { id: 36, name: "Black Fitted Flare Jeans", category: "bottoms", subcategory: "jeans", price: 65, image: "/images/bottoms/b8.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Black", fabric: "Denim" },
  { id: 37, name: "Strigid Mom Jeans", category: "bottoms", subcategory: "jeans", price: 45, image: "/images/bottoms/b10.png", size: ["XXS","XS","S","M","L","XL"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Blue", fabric: "Denim" },

  { id: 39, name: "Olive Wrap Midi", category: "dresses", subcategory: "midi", price: 155, image: "/images/dresses/d1.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Green", fabric: "Polyester" },
  { id: 40, name: "Embroidered Honey Gown", category: "dresses", subcategory: "maxi", price: 330, image: "/images/dresses/d9.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Gold", fabric: "Silk" },
  { id: 41, name: "Copper Slip Wrap", category: "dresses", subcategory: "midi", price: 168, image: "/images/dresses/d3.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Orange", fabric: "Silk" },
  { id: 42, name: "Peach Summer Crisscross Maxi", category: "dresses", subcategory: "maxi", price: 330, image: "/images/dresses/d10.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Orange", fabric: "Polyester" },
  { id: 43, name: "Black Satin Mini", category: "dresses", subcategory: "mini", price: 50, image: "/images/dresses/d4.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Black", fabric: "Satin" },
  { id: 44, name: "V-Neckline White Dress", category: "dresses", subcategory: "midi", price: 175, image: "/images/dresses/d2.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "White", fabric: "Polyester" },
  { id: 45, name: "Red Strapless Mini", category: "dresses", subcategory: "mini", price: 45, image: "/images/dresses/d5.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Red", fabric: "Polyester" },
  { id: 46, name: "Forest Corset Gown", category: "dresses", subcategory: "maxi", price: 350, image: "/images/dresses/d8.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Green", fabric: "Silk" },
  { id: 47, name: "Framed Strapless Mini", category: "dresses", subcategory: "mini", price: 85, image: "/images/dresses/d6.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "White", fabric: "Polyester" },
  { id: 48, name: "Blue Floral Maxi Dress", category: "dresses", subcategory: "maxi", price: 55, image: "/images/dresses/d7.png", size: ["XXS","XS","S","M","L"], length: ["X-Short (28\")", "Short (30\")", "Regular (32\")"], color: "Blue", fabric: "Polyester" },

  { id: 50, name: "Cropped Denim Jacket", category: "outerwear", subcategory: "jackets", price: 45, image: "/images/outerwear/o2.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "Blue", fabric: "Denim" },
  { id: 51, name: "Black Tailored Blazer", category: "outerwear", subcategory: "blazers", price: 165, image: "/images/outerwear/o11.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "Black", fabric: "Wool" },
  { id: 52, name: "White Wind Jacket", category: "outerwear", subcategory: "jackets", price: 55, image: "/images/outerwear/o1.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "White", fabric: "Polyester" },
  { id: 53, name: "Navy Longline Coat", category: "outerwear", subcategory: "coats", price: 172, image: "/images/outerwear/o9.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "Blue", fabric: "Wool" },
  { id: 54, name: "Midgnight Denim Jacket", category: "outerwear", subcategory: "jackets", price: 42, image: "/images/outerwear/o3.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "Blue", fabric: "Denim" },
  { id: 55, name: "Red Sport jacket", category: "outerwear", subcategory: "jackets", price: 55, image: "/images/outerwear/o10.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "Red", fabric: "Polyester" },
  { id: 56, name: "Brown Suede Jacket", category: "outerwear", subcategory: "jackets", price: 42, image: "/images/outerwear/o4.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "Brown", fabric: "Suede" },
  { id: 57, name: "Maxi Graphite Coat", category: "outerwear", subcategory: "coats", price: 155, image: "/images/outerwear/o7.png", size: ["XXS","XS","S","M","L","XL"], length: ["Regular"], color: "Grey", fabric: "Wool" },
  { id: 58, name: "Urban Black Hood Jacket", category: "outerwear", subcategory: "jackets", price: 44, image: "/images/outerwear/o8.png", size: ["S","M","L","XL"], length: ["Regular"], color: "Black", fabric: "Polyester" },
]

