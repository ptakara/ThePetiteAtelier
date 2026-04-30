//app/payment-method/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type SavedPayment = {
  nickname: string
  type: "credit-card"
  cardholderName: string
  last4: string
  expiration: string
  brand: string
}

export default function PaymentMethodPage() {
  const router = useRouter()

  const [cardholderName, setCardholderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiration, setExpiration] = useState("")
  const [cvv, setCvv] = useState("")
  const [savedPayments, setSavedPayments] = useState<SavedPayment[]>([])
  const [cardNickname, setCardNickname] = useState("")

  useEffect(() => {
  const stored = localStorage.getItem("savedPayments")
    if (stored) {
      setSavedPayments(JSON.parse(stored))
    }
  }, [])


  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim()
  }

  const formatExpiration = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 4)

    if (numbers.length >= 3) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`
    }

    return numbers
  }

  const formatCvv = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 3)
  }

  {/*Detect Card Band */}
  const getCardBrand = (number: string) => {
    if (/^4/.test(number)) return "visa"
    if (/^5[1-5]/.test(number)) return "master"
    if (/^3[47]/.test(number)) return "amex"
    return "card"
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    const cleanCardNumber = cardNumber.replace(/\s/g, "")
    const last4 = cleanCardNumber.slice(-4)
    const brand = getCardBrand(cleanCardNumber)

    const payment: SavedPayment = {
      nickname: cardNickname,
      type: "credit-card",
      cardholderName,
      last4,
      expiration,
      brand,
    }

    const updatedPayments = [...savedPayments, payment]

    localStorage.setItem("savedPayments", JSON.stringify(updatedPayments))
    setSavedPayments(updatedPayments)
    setCardNickname("")
    setCardholderName("")
    setCardNumber("")
    setExpiration("")
    setCvv("")
  }

  const removePayment = (indexToRemove: number) => {
    const updatedPayments = savedPayments.filter(
      (_, index) => index !== indexToRemove
    )

    localStorage.setItem("savedPayments", JSON.stringify(updatedPayments))
    setSavedPayments(updatedPayments)
  }



  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-semibold">
          Payment Method
        </h1>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/profile")}
        >
          Go Back 
        </Button>
      </div>

    {/*Add new card form   */}
      <div className="mt-7" >
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
              placeholder=""
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
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder=""
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
                  onChange={(e) => setExpiration(formatExpiration(e.target.value))}
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
                  onChange={(e) => setCvv(formatCvv(e.target.value))}
                  placeholder=""
                  className="mt-1"
                  required
                />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit">
              Save Payment Method
            </Button>
          </div>
        </form>
      </div>

      {/*Display cards */}
      <div className="mt-4" >
        {savedPayments.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 mb-6">
                {savedPayments.map((payment, index) => (
                  <div key={index} className="border rounded-lg bg-card p-5">
                    <div className="flex items-center gap-3 mb-3">

                      {/*Card icons*/}
                      <img
                        src={`/images/${payment.brand}.png`}
                        alt={payment.brand}
                        className="h-6 w-10 object-contain"
                      />
                      
                      <h2 className="font-medium">{payment.nickname || "Saved Card"}</h2>
                    </div>

                    <p className="text-sm">
                      Card ending in **** {payment.last4}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {payment.cardholderName}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Expires {payment.expiration}
                    </p>

                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => removePayment(index)}
                    >
                      Remove Card
                    </Button>
                  </div>
                ))}
              </div>
            )}
      </div>

    </div>
  )

}