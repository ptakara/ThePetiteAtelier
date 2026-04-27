"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function EditProfilePage() {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [street, setStreet] = useState("")
  const [apartment, setApartment] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")

  // Load saved data
  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "")
    setLastName(localStorage.getItem("lastName") || "")
    setStreet(localStorage.getItem("street") || "")
    setApartment(localStorage.getItem("apartment") || "")
    setCity(localStorage.getItem("city") || "")
    setState(localStorage.getItem("state") || "")
    setZip(localStorage.getItem("zip") || "")
    setCountry(localStorage.getItem("country") || "")
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    localStorage.setItem("firstName", firstName)
    localStorage.setItem("lastName", lastName)
    localStorage.setItem("street", street)
    localStorage.setItem("apartment", apartment)
    localStorage.setItem("city", city)
    localStorage.setItem("state", state)
    localStorage.setItem("zip", zip)
    localStorage.setItem("country", country)

    router.push("/profile")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border rounded-md p-8 bg-card">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Edit Profile
        </h1>

        <form onSubmit={handleSave} className="space-y-4">

          <div>
            <label className="text-sm text-muted-foreground">
              First Name
            </label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Last Name
            </label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="mt-1"
              required
            />
          </div>

          {/* STREET */}
          <div>
            <label className="text-sm text-muted-foreground">
              Street Address
            </label>
            <Input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder=""
              className="mt-1"
              required
            />
          </div>

          {/* APARTMENT */}
          <div>
            <label className="text-sm text-muted-foreground">
              Apartment / Suite (optional)
            </label>
            <Input
              value={apartment}
              onChange={(e) => setApartment(e.target.value)}
              placeholder="optional"
              className="mt-1"
            />
          </div>

          {/* CITY + STATE */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground">
                City
              </label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder=""
                className="mt-1"
                required
              />
            </div>

            <div className="w-24">
              <label className="text-sm text-muted-foreground">
                State
              </label>
              <Input
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder=""
                className="mt-1"
                required
              />
            </div>
          </div>

          {/* ZIP */}
          <div>
            <label className="text-sm text-muted-foreground">
              ZIP Code
            </label>
            <Input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder=""
              className="mt-1"
              required
            />
          </div>

          {/* COUNTRY */}
          <div>
            <label className="text-sm text-muted-foreground">  
              Country
            </label>
            <Input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder=""
              className="mt-1"
              required
            />
          </div>


          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}