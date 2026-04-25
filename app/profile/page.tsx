"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { expertsByZip } from "@/lib/experts"

type Appointment = {
  id: string
  service: string
  expert: string
  date: string
  time: string
  zipcode: string
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("My Orders")

  const [avatar, setAvatar] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")

  const [appointments, setAppointments] = useState<Appointment[]>([])
  
  const getExpert = (zipcode: string, name: string) => {
    const experts = expertsByZip[zipcode] || []
    return experts.find((e) => e.name === name)
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const favoriteItem = {
    name: "Petite Linen Dress",
    image: "/images/product1.jpg",
  }

  const alterationAppointments = appointments
  const isOrders = activeTab === "My Orders"

  // Load saved data safely
  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar")
    const savedFirstName = localStorage.getItem("firstName")
    const savedLastName = localStorage.getItem("lastName")
    const savedAddress = localStorage.getItem("address")

    if (savedAvatar) setAvatar(savedAvatar)
    if (savedFirstName) setFirstName(savedFirstName)
    if (savedLastName) setLastName(savedLastName)
    if (savedAddress) setAddress(savedAddress)
  
    const storedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    )
    setAppointments(storedAppointments)
  }, [])



  // Avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      const base64 = reader.result as string
      setAvatar(base64)
      localStorage.setItem("avatar", base64)
    }

    reader.readAsDataURL(file)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Payment Method":
        return <Card title="Payment Method" full />
      case "Measurements":
        return <Card title="My Measurements" full />
      case "Preferences":
        return <Card title="My Preferences" full />
      case "My Alteration Services":
        return (
          <div className="space-y-4">
            
            {/* Header Card */}
            <div className="border rounded-md p-4 bg-card">
              <p className="text-sm text-muted-foreground">
                To cancel or view full details of your alteration appointments, please visit  <a href="/appointments" className="underline text-sm"> My Appointments</a>
              </p>
            </div>

            {/* Appointments List */}
            {alterationAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No alteration appointments yet.
              </p>
            ) : (
             alterationAppointments.map((appt) => {
              const expert = getExpert(appt.zipcode, appt.expert)

              return (
                <div
                  key={appt.id}
                  className="border rounded-md p-3 bg-card"
                >
                  <p className="text-sm text-muted-foreground">
                    {appt.date} at {appt.time}
                  </p>

                  <p className="font-medium">{appt.service}</p>

                  <p className="text-sm mt-2">
                    Expert: {appt.expert}
                  </p>

                  {expert && (
                    <div className="text-sm mt-2 space-y-1 text-muted-foreground">
                      <p>📍 {expert.address}</p>
                    </div>
                  )}
                </div>
              )
            })
            )}
          </div>
        )
      case "Rewards":
        return <Card title="Rewards Info" full showEdit={false} />
      default:
        return null
    }
  }

  



  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* TOP */}
        <div className="flex gap-8 items-start">

          {/* PROFILE INFO */}
          <div className="md:col-span-2 flex gap-6 w-full">

            {/* AVATAR */}
            <div
              className="w-40 h-40 border rounded-md flex items-center justify-center bg-muted cursor-pointer overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatar ? (
                <img
                  src={avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground">
                  Click to add avatar
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* USER INFO */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {firstName || "Username"}
                  </h1>

                  <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-accent text-background">
                    Member Type
                  </span>
                </div>
                
                <Link href="/profile/edit" className="text-sm underline whitespace-nowrap ml-auto">
                  Edit Profile
                </Link>
              </div>
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p>{firstName || "First Name"}</p>
                <p>{lastName || "Last Name"}</p>
                <p>{address || "Address"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap border rounded-md overflow-hidden">
          {[
            "My Orders",
            "Payment Method",
            "Measurements",
            "Preferences",
            "My Alteration Services",
            "Rewards",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm border-r last:border-r-0 
              ${
                activeTab === tab
                  ? "bg-accent text-background"
                  : "hover:bg-accent/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {isOrders ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="My Orders" />

            <div className="border rounded-md p-4 h-64 bg-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-foreground">
                  My Favorites
                </h3>

                <Link
                  href="/favorites"
                  className="text-sm text-accent hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={favoriteItem.image}
                  alt={favoriteItem.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <p className="text-sm text-foreground">
                  {favoriteItem.name}
                </p>
              </div>
            </div>
          </div>
        ) : (
          renderTabContent()
        )}
      </div>
    </div>
  )
}

/* CARD COMPONENT */
function Card({
  title,
  full,
  showEdit = true,
}: {
  title: string
  full?: boolean
  showEdit?: boolean
}) {
  return (
    <div
      className={`border rounded-md p-4 h-64 relative bg-card ${
        full ? "w-full" : ""
      }`}
    >
      {showEdit && (
        <button className="absolute top-2 right-2 text-sm text-muted-foreground">
          Edit
        </button>
      )}

      <div className="flex items-center justify-center h-full text-muted-foreground">
        {title}
      </div>
    </div>
  )
}