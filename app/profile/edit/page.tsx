"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function EditProfilePage() {
  const router = useRouter()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthdayMonth, setBirthdayMonth] = useState("")
  const [birthdayDay, setBirthdayDay] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")

  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "")
    setLastName(localStorage.getItem("lastName") || "")
    setBirthdayMonth(localStorage.getItem("birthdayMonth") || "")
    setBirthdayDay(localStorage.getItem("birthdayDay") || "")
    setMobileNumber(localStorage.getItem("mobileNumber") || "")
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()

    localStorage.setItem("firstName", firstName)
    localStorage.setItem("lastName", lastName)
    localStorage.setItem("birthdayMonth", birthdayMonth)
    localStorage.setItem("birthdayDay", birthdayDay)
    localStorage.setItem("mobileNumber", mobileNumber)

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

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground">
                Birthday Month
              </label>
         <select
            value={birthdayMonth}
            onChange={(e) => setBirthdayMonth(e.target.value)}
            className="mt-1 w-full border rounded-md px-3 py-2 bg-background"
            required
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
            </div>

            <div className="flex-1">
              <label className="text-sm text-muted-foreground">
                Birthday Day
              </label>
              <Input
                value={birthdayDay}
                onChange={(e) => setBirthdayDay(e.target.value)}
                placeholder="DD"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground">
              Mobile Number
            </label>
            <Input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="(123) 456-7890"
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