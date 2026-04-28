"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Address = {
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

export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>([])

  const [form, setForm] = useState({
    label: "",
    firstName: "",
    lastName: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  })

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedAddresses") || "[]")
    setAddresses(stored)
  }, [])

  const saveAddresses = (updated: Address[]) => {
    setAddresses(updated)
    localStorage.setItem("savedAddresses", JSON.stringify(updated))
  }

  const handleAdd = () => {
    if (!form.firstName || !form.street || !form.city) return

    const newAddress: Address = {
      id: crypto.randomUUID(),
      label: form.label || "My Address",
      ...form,
    }

    saveAddresses([newAddress, ...addresses])

    setForm({
      label: "",
      firstName: "",
      lastName: "",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
    })
  }

  const handleDelete = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id)
    saveAddresses(updated)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">

        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold">
             Address Book
            </h1>

            <Link
                href="/checkout"
                className="text-sm text-muted-foreground underline underline-offset-4"
            >
                ← Back to Checkout
            </Link>
        </div>


      {/* ADD NEW ADDRESS */}
      <div className="border rounded-lg p-6 mb-8 space-y-4">
        <h2 className="text-lg font-medium">Add New Address</h2>

        <Input
          placeholder="Label (Home, Work...)"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <Input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <Input
          placeholder="Street Address"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
        />

        <Input
          placeholder="Apartment (optional)"
          value={form.apartment}
          onChange={(e) => setForm({ ...form, apartment: e.target.value })}
        />

        <div className="grid grid-cols-3 gap-4">
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />

          <Input
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />

          <Input
            placeholder="ZIP"
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
          />
        </div>

        <Button onClick={handleAdd} className="w-full">
          Save Address
        </Button>
      </div>

      {/* SAVED ADDRESSES */}
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No saved addresses yet.
          </p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className="border rounded-lg p-4 flex justify-between items-start"
            >
              <div className="text-sm">
                <p className="font-medium">{addr.label}</p>
                <p>
                  {addr.firstName} {addr.lastName}
                </p>
                <p>
                  {addr.street}
                  {addr.apartment ? `, ${addr.apartment}` : ""}
                </p>
                <p>
                  {addr.city}, {addr.state} {addr.zip}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(addr.id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}