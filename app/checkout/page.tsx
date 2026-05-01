"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CreditCard, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

type CartItem = {
  id: number
  name: string
  price: number
  image: string
  selectedSize: string
  selectedLength?: string
  quantity?: number
}

type SavedPayment = {
  type: "credit-card"
  cardholderName: string
  last4: string
  expiration: string
}

type SavedAddress = {
  id: string
  label: string
  firstName: string
  lastName: string
  street: string
  apartment?: string
  city: string
  state: string
  zip: string
}


export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [showSuccess, setShowSuccess] = useState(false)
  const [cardNickname, setCardNickname] = useState("")

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  })

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState("")

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(storedCart)
    
    const storedPayments = localStorage.getItem("savedPayments")
    if (storedPayments) {
      setSavedPayments(JSON.parse(storedPayments))
    }

    
    const storedAddresses = JSON.parse(
      localStorage.getItem("savedAddresses") || "[]"
    )

    setSavedAddresses(storedAddresses)

    if (storedAddresses.length > 0) {
      const defaultAddress = storedAddresses[0]

      setSelectedAddressId(defaultAddress.id)

      setShippingInfo({
        firstName: defaultAddress.firstName,
        lastName: defaultAddress.lastName,
        street: defaultAddress.street,
        apartment: defaultAddress.apartment || "",
        city: defaultAddress.city,
        state: defaultAddress.state,
        zip: defaultAddress.zip,
      })
    }

  }, [])

  const merchandiseTotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  )

  const savings = 0
  const shippingFee = merchandiseTotal > 75 ? 0 : 5.99
  const tax = (merchandiseTotal - savings) * 0.07
  const subtotal = merchandiseTotal - savings + shippingFee + tax
  const router = useRouter()
  const [cardNumber, setCardNumber] = useState("")
  const [savedPayments, setSavedPayments] = useState<SavedPayment[]>([])



  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")

    const newOrder = {
      orderNumber: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cart,
      merchandiseTotal,
      savings,
      shippingFee,
      tax,
      subtotal,

      shippingAddress: `${shippingInfo.street}${shippingInfo.apartment ? `, ${shippingInfo.apartment}` : ""}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,

      paymentLast4:
      paymentMethod === "credit-card"
        ? cardNumber.slice(-4)
        : paymentMethod,

      paymentMethod: {
        cardNickname: cardNickname || "Saved Card",
        last4: cardNumber.slice(-4),
      },
    }

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    )

    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("storage"))

    setShowSuccess(true)

    setTimeout(() => {
      window.location.href = "/my-orders"
    }, 3000)
  }


    {showSuccess && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-background rounded-lg px-8 py-6 shadow-lg text-center animate-fade-in">
        <h2 className="text-lg font-semibold mb-2">
            Your order has been placed successfully.
        </h2>
        <p className="text-sm text-muted-foreground">
            Redirecting to My Orders...
        </p>
        </div>
    </div>
    )}


  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      {cart.length === 0 ? (
        <div className="border rounded-lg bg-card p-10 text-center">
          <h2 className="text-xl font-medium">Your bag is empty</h2>
          <Button asChild className="mt-6">
            <Link href="/shop/tops">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Saved Addresses Dropdown */}
            {savedAddresses.length > 0 && (
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium">
                  <h2 className="text-xl font-medium">  Choose saved address</h2>  
                </label>

                <select
                  value={selectedAddressId}
                  onChange={(e) => {
                    const address = savedAddresses.find(
                      (item) => item.id === e.target.value
                    )

                    if (!address) return

                    setSelectedAddressId(address.id)
                    setShippingInfo({
                      firstName: address.firstName,
                      lastName: address.lastName,
                      street: address.street,
                      apartment: address.apartment || "",
                      city: address.city,
                      state: address.state,
                      zip: address.zip,
                    })
                  }}
                  className="w-full rounded-md border bg-white px-3 py-4 text-sm"
                >
                  {savedAddresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {address.label} — {address.street}, {address.city}
                    </option>
                  ))}
                </select>
              </div>
            )}

        
            {/* SHIPPING FORM */}
            <div className="border rounded-lg bg-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Truck className="h-5 w-5" />
                <h2 className="text-xl font-medium">Shipping Information</h2>     
            </div>

            <Link
              href="/profile/addresses"
              className="mb-5 inline-block text-sm underline underline-offset-4"
            >
              Add  & Manage Shipping Addresses
            </Link>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={shippingInfo.firstName}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="Last Name"
                  value={shippingInfo.lastName}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                  }
                  required
                />

                <Input
                  className="sm:col-span-2"
                  placeholder="Street Address"
                  value={shippingInfo.street}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, street: e.target.value })
                  }
                  required
                />

                <Input
                  className="sm:col-span-2"
                  placeholder="Apartment / Suite (optional)"
                  value={shippingInfo.apartment}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, apartment: e.target.value })
                  }
                />

                <Input
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, city: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, state: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="ZIP Code"
                  value={shippingInfo.zip}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, zip: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="border rounded-lg bg-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="h-5 w-5" />
                <h2 className="text-xl font-medium">Payment Method</h2>
              </div>
              
         {savedPayments.length > 0 && (
            <div className="mb-4 space-y-3">
              {savedPayments.map((card, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(`saved-card-${index}`)
                    setCardNickname(card.cardholderName)
                    setCardNumber(card.last4)
                  }}
                  className={`w-full border rounded-md p-4 text-left transition ${
                    paymentMethod === `saved-card-${index}`
                      ? "bg-foreground text-background"
                      : "hover:bg-muted"
                  }`}
                >
                  <p className="font-medium">
                    Use saved card ending in **** {card.last4}
                  </p>

                  <p className="text-sm opacity-80">
                    {card.cardholderName} • Expires {card.expiration}
                  </p>
                </button>
              ))}
            </div>
          )}


              <div className="grid sm:grid-cols-5 gap-3 mb-6">
                {[
                  ["credit-card", "Card"],
                  ["paypal", "PayPal"],
                  ["affirm", "Affirm"],
                  ["afterpay", "Afterpay"],
                  ["klarna", "Klarna"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPaymentMethod(value)}
                    className={`border rounded-md py-3 text-sm transition ${
                      paymentMethod === value
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {paymentMethod === "credit-card" ? (
                <div className="space-y-4">
                 <Input
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" required />
                    <Input placeholder="CVV" required />
                  </div>
                  <Input placeholder="Name on Card" required />
                </div>
              ) : (
                <div className="rounded-md border p-4 text-sm text-muted-foreground">
                  You selected {paymentMethod}.
                </div>
              )}
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="space-y-4">
            <div className="border rounded-lg bg-card p-5 sticky top-32">
              <h2 className="font-medium mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                {cart.map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="flex gap-3 text-sm items-start"
                    >
                        {/* IMAGE */}
                        <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        </div>

                        {/* INFO */}
                        <div className="flex-1">
                        <p className="font-medium">{item.name}</p>

                        <p className="text-muted-foreground text-xs">
                            Size: {item.selectedSize}
                        </p>

                        {item.selectedLength && (
                            <p className="text-muted-foreground text-xs">
                            Length: {item.selectedLength}
                            </p>
                        )}

                        <p className="text-muted-foreground text-xs">
                            Qty: {item.quantity || 1}
                        </p>
                        </div>

                        {/* PRICE */}
                        <div className="text-right">
                        <p className="font-medium">
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                        </div>
                    </div>
                    ))}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
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
                  <span>{shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button type="submit" className="w-full" size="lg">
                    Place Order
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-red-300 text-red-500 hover:bg-red-400 hover:text-black hover:border-red-400 transition-colors"
                    onClick={() => router.push("/bag")}
                >
                    Cancel
                </Button>
                </div>
            </div>
          </div>
        </form>
    )}

        {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-background rounded-lg p-6 shadow-xl text-center w-80 animate-in fade-in zoom-in">      
                <h2 className="text-lg font-semibold mb-2">
                    Order Placed
                </h2>
                <p className="text-sm text-muted-foreground">
                    Your order has been placed successfully.
                    <br />
                    You will receive an email confirmation shortly.
                </p>
                </div>
            </div>
        )}
    </div>
  )
}