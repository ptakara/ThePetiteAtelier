"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type OrderItem = {
  id: number
  name: string
  price: number
  image: string
  selectedSize: string
  selectedLength?: string
  quantity?: number
}

type Order = {
  orderNumber: string
  date: string
  items: OrderItem[]
  merchandiseTotal: number
  savings: number
  shippingFee: number
  tax: number
  subtotal: number
  shippingAddress?: string
  paymentLast4?: string
}


export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [openOrder, setOpenOrder] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const router = useRouter()

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(savedOrders)
  }, [])

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    return sortOrder === "newest"
      ? dateB - dateA
      : dateA - dateB
  })

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-semibold">My Orders</h1>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/profile")}
            >
              Go Back 
            </Button>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            View your previous purchases and order details.
          </p>

          <div className="mt-7">
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
              className="rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-lg border bg-card px-6 text-center">
          <Package className="mb-4 h-10 w-10 text-muted-foreground" />

          <h2 className="text-xl font-medium">No orders yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Once you place an order, it will appear here.
          </p>

          <Button asChild className="mt-6">
            <Link href="/shop/tops">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4 mt-14">
          {sortedOrders.map((order) => {
            const isOpen = openOrder === order.orderNumber

            return (
              <div
                key={order.orderNumber}
                className="rounded-lg border bg-card"
              >
                <button
                  onClick={() =>
                    setOpenOrder(isOpen ? null : order.orderNumber)
                  }
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {order.items.slice(0, 4).map((item, index) => (
                        <Image
                          key={`${item.id}-${index}`}
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-md border bg-background object-cover"
                        />
                      ))}
                    </div>

                    <div>
                      <p className="font-medium">
                        Order #{order.orderNumber}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleString()}
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.items.length} item
                        {order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-semibold">
                      ${order.subtotal.toFixed(2)}
                    </p>

                    {isOpen ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t p-5">
                    <div className="mb-5">
                      <h3 className="font-medium">Order Details</h3>
                    </div>

                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex gap-4 rounded-md border p-3"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={90}
                            height={90}
                            className="h-24 w-24 rounded-md object-cover"
                          />

                          <div className="flex-1"> 
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Price: ${item.price}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              Size: {item.selectedSize}
                            </p>

                            {item.selectedLength && (
                              <p className="text-sm text-muted-foreground">
                                Length: {item.selectedLength}
                              </p>
                            )}

                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity || 1}
                            </p>
                          </div>

                          <p className="font-medium">
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-6">
                      
                      {/* LEFT: Shipping + Payment */}
                      <div className="w-full max-w-sm space-y-4">
                        <div className="rounded-md border p-4">
                          <h4 className="font-medium">Shipping Address</h4>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {order.shippingAddress || "No shipping address saved"}
                          </p>
                        </div>

                        <div className="rounded-md border p-4">
                          <h4 className="font-medium">Payment</h4>

                         <p className="font-medium">
                          Saved Card
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Card ending in {order.paymentLast4 || "0000"}
                        </p>
                                                </div>
                      </div>

                      {/* RIGHT: Order Totals */}
                      <div className="w-full max-w-sm ml-auto space-y-2 rounded-md border p-4 text-sm">
                        <div className="flex justify-between">
                          <span>Merchandise</span>
                          <span>${order.merchandiseTotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Savings</span>
                          <span>-${order.savings.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>
                            {order.shippingFee === 0
                              ? "Free"
                              : `$${order.shippingFee.toFixed(2)}`}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>

                        <div className="border-t pt-3 flex justify-between font-semibold">
                          <span>Subtotal</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                      </div>

                    </div>


                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}