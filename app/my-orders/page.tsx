//app/my-orders/page.tsx

"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

type OrderItem = {
  id: number
  name: string
  price: number
  image: string
  selectedSize: string
  selectedLength?: string
  quantity?: number
  returnSelected?: boolean
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

  status?: "Delivered" | "Return Requested" | "Returned" | "Refunded"
  returnRequested?: boolean
  returnDate?: string
  returnItems?: OrderItem[]
  returnMethod?: string
  refundMethod?: string
  returnDeadline?: string
  estimatedRefund?: number
}


function MyOrdersPageContent() {
  const [orders, setOrders] = useState<Order[]>([])
  const [openOrder, setOpenOrder] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderFromURL = searchParams.get("order")
  const openedOrderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (orderFromURL) {
      setOpenOrder(orderFromURL)

      setTimeout(() => {
        openedOrderRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 200)
    }
  }, [orderFromURL])

  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    return sortOrder === "newest"
      ? dateB - dateA
      : dateA - dateB
  })



  //*Return Window, if eligible
  const isReturnEligible = (orderDate: string) => {
    const orderTime = new Date(orderDate).getTime()
    const now = new Date().getTime()
    const daysDiff = (now - orderTime) / (1000 * 60 * 60 * 24)
    return daysDiff <= 30
  }

  const [showReturnPopup, setShowReturnPopup] = useState(false)
  const [returnStep, setReturnStep] = useState(1)
  const [selectedReturnOrder, setSelectedReturnOrder] = useState<Order | null>(null)
  const [selectedReturnItems, setSelectedReturnItems] = useState<OrderItem[]>([])
  const [returnMethod, setReturnMethod] = useState("")
  const [refundMethod, setRefundMethod] = useState("")
  const [showReturnSuccess, setShowReturnSuccess] = useState(false)



  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const ordersWithStatus = savedOrders.map((order: any) => ({
      ...order,
      status: order.status || "Delivered",
    }))
    setOrders(ordersWithStatus)
  }, [])



  //Return helper function
  const toggleReturnItem = (item: OrderItem) => {
    const alreadySelected = selectedReturnItems.some(
      (selectedItem) => selectedItem.id === item.id
    )

    if (alreadySelected) {
      setSelectedReturnItems(
        selectedReturnItems.filter((selectedItem) => selectedItem.id !== item.id)
      )
    } else {
      setSelectedReturnItems([...selectedReturnItems, item])
    }
  }

  // Submit Return function
  const submitReturn = () => {
    if (!selectedReturnOrder) return

    const today = new Date()
    const deadline = new Date()
    deadline.setDate(today.getDate() + 10)

    const estimatedRefund = selectedReturnItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    )

    const updatedOrders = orders.map((order) => {
      if (order.orderNumber !== selectedReturnOrder.orderNumber) {
        return order
      }

      return {
        ...order,
        status: "Return Requested" as const,
        returnItems: [
          ...(order.returnItems || []),
          ...selectedReturnItems,
        ],
        returnMethod,
        refundMethod,
        returnDate: today.toISOString(),
        returnDeadline: deadline.toISOString(),
        estimatedRefund,
      }
    })

    setOrders(updatedOrders)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))

    setShowReturnPopup(false)
    setSelectedReturnOrder(null)
    setSelectedReturnItems([])
    setReturnMethod("")
    setRefundMethod("")
    setReturnStep(1)
    setShowReturnSuccess(true)
  }




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
                ref={order.orderNumber === orderFromURL ? openedOrderRef : null}
                className={`rounded-lg border bg-card ${
                  order.orderNumber === orderFromURL
                    ? "border-black bg-muted/40"
                    : ""
                }`}
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

                      <p className="text-xs text-muted-foreground mt-1">
                        Status: {order.status || "Delivered"}
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

                    {/*Return Button*/}
                    <div className="mt-6 flex gap-6">
                      {isReturnEligible(order.date) &&
                        order.items.some(
                          (item) =>
                            !order.returnItems?.some(
                              (returnItem) => returnItem.id === item.id
                            )
                        ) && (
                      <Button
                        onClick={() => {
                          setSelectedReturnOrder(order)
                          setSelectedReturnItems([])
                          setReturnMethod("")
                          setRefundMethod("")
                          setReturnStep(1)
                          setShowReturnPopup(true)
                        }}
                        className="mt-2"
                      >
                        Start Return
                      </Button>
                      )}

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


      {/* return pop up*/}
      {showReturnPopup && selectedReturnOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-xl rounded-md border bg-card p-6 max-h-[90vh] overflow-y-auto">
            
            {returnStep === 1 && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Select items to return
                </h2>

                <div className="space-y-3">
                  {selectedReturnOrder.items
                    .filter(
                      (item) =>
                        !selectedReturnOrder.returnItems?.some(
                          (returnItem) => returnItem.id === item.id
                        )
                    )
                    .map((item, index) => {
                    const isSelected = selectedReturnItems.some(
                      (selectedItem) => selectedItem.id === item.id
                    )

                    return (
                      <button
                        key={`${item.id}-${index}`}
                        onClick={() => toggleReturnItem(item)}
                        className={`w-full flex items-center gap-4 rounded-md border p-3 text-left ${
                          isSelected ? "border-accent bg-accent/10" : "bg-background"
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />

                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.selectedSize}
                          </p>

                          {item.selectedLength && (
                            <p className="text-sm text-muted-foreground">
                              Length: {item.selectedLength}
                            </p>
                          )}

                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity || 1}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowReturnPopup(false)}>
                    Cancel
                  </Button>

                  <Button
                    disabled={selectedReturnItems.length === 0}
                    onClick={() => setReturnStep(2)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {returnStep === 2 && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  How would you like to return it?
                </h2>

                <div className="space-y-3">
                  <button
                    onClick={() => setReturnMethod("Print Label at Home")}
                    className={`w-full rounded-md border p-4 text-left ${
                      returnMethod === "Print Label at Home"
                        ? "border-accent bg-accent/10"
                        : "bg-background"
                    }`}
                  >
                    <p className="font-medium">Print label at home</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Schedule a free pickup, leave it in your mailbox, or take it to a shipping location of your choice.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1"> (Label will be sent to your email)</p>
                  </button>

                  <button
                    onClick={() => setReturnMethod("Digital QR Code")}
                    className={`w-full rounded-md border p-4 text-left ${
                      returnMethod === "Digital QR Code"
                        ? "border-accent bg-accent/10"
                        : "bg-background"
                    }`}
                  >
                    <p className="font-medium">Get a digital QR code</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      No printer, no problem! You’ll get a return code that you can show at the carrier&apos;s location and they’ll print a label for you. 
                    </p>
                    <p className="text-xs text-muted-foreground mt-1"> (QR code will be sent to your email)</p>
                  </button>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setReturnStep(1)}>
                    Back
                  </Button>

                  <Button
                    disabled={!returnMethod}
                    onClick={() => setReturnStep(3)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {returnStep === 3 && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Choose refund method
                </h2>

                <div className="space-y-3">
                  <button
                    onClick={() => setRefundMethod("Original Card")}
                    className={`w-full rounded-md border p-4 text-left ${
                      refundMethod === "Original Card"
                        ? "border-accent bg-accent/10"
                        : "bg-background"
                    }`}
                  >
                    Return refund to original card
                  </button>

                  <button
                    onClick={() => setRefundMethod("Website Credit")}
                    className={`w-full rounded-md border p-4 text-left ${
                      refundMethod === "Website Credit"
                        ? "border-accent bg-accent/10"
                        : "bg-background"
                    }`}
                  >
                    Issue refund as website credit
                  </button>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setReturnStep(2)}>
                    Back
                  </Button>

                  <Button
                    disabled={!refundMethod}
                    onClick={() => setReturnStep(4)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {returnStep === 4 && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Return overview
                </h2>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">Items being returned:</p>

                    <div className="space-y-2">
                      {selectedReturnItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="flex gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />

                          <div>
                            <p>{item.name}</p>
                            <p className="text-muted-foreground">
                              Qty: {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p>
                    <span className="font-medium">Return method:</span>{" "}
                    {returnMethod}
                  </p>

                  <p>
                    <span className="font-medium">Refund method:</span>{" "}
                    {refundMethod}
                  </p>

                  <p>
                    <span className="font-medium">Drop-off deadline:</span>{" "}
                    Within 10 days after submitting the return.
                  </p>

                  <p>
                    <span className="font-medium">Estimated refund:</span>{" "}
                    $
                    {selectedReturnItems
                      .reduce(
                        (total, item) => total + item.price * (item.quantity || 1),
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setReturnStep(3)}>
                    Back
                  </Button>

                  <Button onClick={submitReturn}>
                    Submit Return
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}


      {/*Return submitted successfully popup */}
      {showReturnSuccess && !showReturnPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-md border bg-card p-6 text-center shadow-lg">
            <h2 className="text-xl font-semibold">
              Return submitted successfully
            </h2>

            <Button
              onClick={() => {
                setShowReturnSuccess(false)
                router.push("/profile?tab=returns")
              }}
              className="mt-6 w-full"
            >
              Go to Returns
            </Button>
          </div>
        </div>
      )}
</div>

  )
}

export default function MyOrdersPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading...</div>}>
      <MyOrdersPageContent />
    </Suspense>
  )
}