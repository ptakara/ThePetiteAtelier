"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SavedPayment = {
  type: "credit-card"
  cardholderName: string
  last4: string
  expiration: string
}

export default function PaymentMethodPage() {
  const router = useRouter()

  const [cardholderName, setCardholderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiration, setExpiration] = useState("")
  const [cvv, setCvv] = useState("")
  const [savedPayment, setSavedPayment] = useState<SavedPayment | null>(null)
  const [cardNickname, setCardNickname] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("savedPayment")
    if (stored) {
      setSavedPayment(JSON.parse(stored))
    }
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const cleanCardNumber = cardNumber.replace(/\s/g, "")
    const last4 = cleanCardNumber.slice(-4)

    const payment: SavedPayment = {
      type: "credit-card",
      cardholderName,
      last4,
      expiration,
    }

    localStorage.setItem("savedPayment", JSON.stringify(payment))
    setSavedPayment(payment)

    setCardNumber("")
    setCvv("")
  }

  const removePayment = () => {
    localStorage.removeItem("savedPayment")
    setSavedPayment(null)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">
        Payment Method
      </h1>

      <p className="text-sm text-muted-foreground mb-8">
        Save a payment method for faster checkout.
      </p>

      {savedPayment && (
        <div className="border rounded-lg bg-card p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <CreditCard className="h-5 w-5" />
            <h2 className="font-medium">Saved Card</h2>
          </div>

          <p className="text-sm">
            Card ending in **** {savedPayment.last4}
          </p>

          <p className="text-sm text-muted-foreground">
            {savedPayment.cardholderName}
          </p>

          <p className="text-sm text-muted-foreground">
            Expires {savedPayment.expiration}
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={removePayment}
          >
            Remove Card
          </Button>
        </div>
      )}

      <form onSubmit={handleSave} className="border rounded-lg bg-card p-6 space-y-4">
        <h2 className="text-xl font-medium">
          Add Credit Card
        </h2>

        <div>
          <label className="text-sm text-muted-foreground">
            Card Nickname
          </label>

          <Input
            placeholder="ex: My Visa"
            value={cardNickname}
            onChange={(e) => setCardNickname(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            Name on Card
          </label>
          <Input
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="Patricia Takara"
            className="mt-1"
            required
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">
            Card Number
          </label>
          <Input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="mt-1"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">
              Expiration
            </label>
            <Input
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              placeholder="MM/YY"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              CVV
            </label>
            <Input
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="mt-1"
              required
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">
            Save Payment Method
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/profile")}
          >
            Back to Profile
          </Button>
        </div>
      </form>
    </div>
  )
}