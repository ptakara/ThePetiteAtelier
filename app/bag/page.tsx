//app/bag/page.text

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  category: string
  subcategory: string
  selectedSize: string
  selectedLength: string
  quantity?: number
}

export default function BagIt() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [promoCode, setPromoCode] = useState("")
  const [shipping, setShipping] = useState<"standard" | "express" | "none">("standard")
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const cartWithQuantity = storedCart.map((item: CartItem) => ({
      ...item,
      quantity: item.quantity || 1,
    }))

    setCart(cartWithQuantity)
    localStorage.setItem("cart", JSON.stringify(cartWithQuantity))
  }, [])

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return

    const updated = [...cart]
    updated[index].quantity = quantity

    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("storage"))
  }

  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index)

    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("storage"))
    
  }

  const moveToFavorites = (item: CartItem, index: number) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

    const alreadyFavorite = favorites.some(
      (fav: CartItem) => fav.id === item.id
    )

    if (!alreadyFavorite) {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, item])
      )
    }

    removeItem(index)
  }

  const merchandiseTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  )

  const savings = promoCode.toLowerCase() === "petite10"
    ? merchandiseTotal * 0.1
    : 0


  const qualifiesForFreeShipping = merchandiseTotal > 75
  const standardShippingFee = 5.99

  const shippingFee =
    qualifiesForFreeShipping
      ? shipping === "express"
        ? standardShippingFee * 2
        : 0
      : shipping === "express"
        ? 14.99
        : standardShippingFee

  const tax = (merchandiseTotal - savings) * 0.07

  const subtotal = merchandiseTotal - savings + shippingFee + tax

  const itemCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  )

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">Shopping Bag</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {itemCount} item{itemCount !== 1 ? "s" : ""} in your bag
      </p>

      {/* Empty Bag */}
      {cart.length === 0 ? (
        <div className="border rounded-lg bg-card p-10 text-center">
          <h2 className="text-xl font-medium">Your bag is empty</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Add items to your bag before checking out.
          </p>

          <Button asChild className="mt-6">
            <Link href="/shop/tops">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ITEMS in the bag */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}-${index}`}
                className="border rounded-lg bg-card p-4 flex gap-4"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={130}
                  height={130}
                  className="w-32 h-32 object-cover rounded-md"
                />

                <div className="flex-1">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="font-medium">{item.name}</h2>
                      {/* size info */}
                      <p className="text-sm text-muted-foreground">
                        Size: {item.selectedSize}
                      </p>
                        {/* length info */}
                      {item.selectedLength && (
                        <p className="text-sm text-muted-foreground">
                          Length: {item.selectedLength}
                        </p>
                      )}
                      {/* price info */}
                      <p className="text-sm text-muted-foreground">
                        ${item.price}
                      </p>
                    </div>
                  

                    <button
                      onClick={() => removeItem(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(index, (item.quantity || 1) - 1)
                        }
                      >
                        -
                      </Button>

                      <span className="w-8 text-center">
                        {item.quantity || 1}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(index, (item.quantity || 1) + 1)
                        }
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveToFavorites(item, index)}
                      className="gap-2"
                    >
                      <Heart className="h-4 w-4" />
                      Move to Favorites
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="space-y-4">
            
            {/*Promo code  */}
            <div className="border rounded-lg bg-card p-5">
              <h2 className="font-medium mb-3">Promo Code</h2>

              <div className="flex gap-2">
                <Input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                />

                <Button type="button" variant="outline">
                  Apply
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-2">
                Try code: PETITE10
              </p>
            </div>

            {/* Shipping Options */}
            <div className="border rounded-lg bg-card p-5">
              <h2 className="font-medium mb-3">Shipping Options</h2>

              <div className="space-y-3">
              
                {/* Shipping Options: Standard */}
                {!qualifiesForFreeShipping && (
                  <label className="flex items-center justify-between border rounded-md p-3 opacity-70">
                  <div>
                    <p className="text-sm font-medium">Standard Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      5–7 business days
                    </p>
                  </div>

                  <span className="text-sm">
                    {qualifiesForFreeShipping ? "Free" : "$5.99"}
                  </span>
                </label>
                )}
                
                {/* Message on the shipping options when free shipping is set */}
                {qualifiesForFreeShipping && (
                  <p className="text-xs text-muted-foreground mb-2">
                    You qualified for free standard shipping. Express shipping is still available.
                  </p>
                )}

                {/* Shipping Options: Express */}
                <label className="flex items-center justify-between border rounded-md p-3 cursor-pointer">
                  <div>
                    <p className="text-sm font-medium">Express Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      2–3 business days
                      {qualifiesForFreeShipping ? " • $11.98" : " • $14.99"}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={shipping === "express"}
                    onChange={() =>
                      setShipping(shipping === "express" ? "none" : "express")
                    }
                  />
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border rounded-lg bg-card p-5">
              <h2 className="font-medium mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Merchandise</span>
                  <span>${merchandiseTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Savings</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
               <span>
                {qualifiesForFreeShipping
                  ? shipping === "express"
                    ? `$${shippingFee.toFixed(2)}`
                    : "Free"
                  : `$${shippingFee.toFixed(2)}`
                }
              </span>
                </div>

              {merchandiseTotal < 75 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Spend ${(75 - merchandiseTotal).toFixed(2)} more for free shipping
                </p>
              )}


                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-base">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout">
                Checkout
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}