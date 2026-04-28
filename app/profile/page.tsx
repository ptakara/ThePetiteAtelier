//app/profile/page.tsx

"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { expertsByZip } from "@/lib/experts"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/lib/products"
import { ProductCard } from "@/components/product-card"
import Image from "next/image"


type Appointment = {
  id: string
  service: string
  expert: string
  date: string
  time: string
  zipcode: string
}

type FavoriteProduct = {
  id: number
  name: string
  price: number
  image: string
  category: string
  subcategory: string
}

type OrderItem = {
  id: number
  name: string
  price: number
  image: string
  category: string
  subcategory: string
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
}


export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("My Orders")

  const [avatar, setAvatar] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [street, setStreet] = useState("")
  const [apartment, setApartment] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")


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
    const savedStreet = localStorage.getItem("street")
    const savedApartment = localStorage.getItem("apartment")
    const savedCity = localStorage.getItem("city")
    const savedState = localStorage.getItem("state")
    const savedZip = localStorage.getItem("zip")
    const savedCountry = localStorage.getItem("country")
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(savedFavorites)
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(savedOrders)

    if (savedAvatar) setAvatar(savedAvatar)
    if (savedFirstName) setFirstName(savedFirstName)
    if (savedLastName) setLastName(savedLastName)
    if (savedStreet) setStreet(savedStreet)
    if (savedApartment) setApartment(savedApartment)
    if (savedCity) setCity(savedCity)
    if (savedState) setState(savedState)
    if (savedZip) setZip(savedZip)
  
    const storedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    )
    setAppointments(storedAppointments)
  }, [])


    const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
    const [orders, setOrders] = useState<Order[]>([])

    const router = useRouter()


    const purchasedItems = orders.flatMap((order) => order.items)

    const favoriteSubcategories = favorites.map((item) => item.subcategory)
    const purchasedSubcategories = purchasedItems.map((item) => item.subcategory)

    const favoriteIds = favorites.map((item) => item.id)
    const purchasedIds = purchasedItems.map((item) => item.id)

    const userSubcategories = [...favoriteSubcategories, ...purchasedSubcategories]

    const recommendedProducts = allProducts
      .filter((product) => userSubcategories.includes(product.subcategory))
      .filter((product) => !favoriteIds.includes(product.id))
      .filter((product) => !purchasedIds.includes(product.id))
      .slice(0, 8)

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
        return (
          <div className="border rounded-md p-6 bg-card">
            <h3 className="font-medium text-foreground mb-2">
              Payment Method
            </h3>

            <p className="text-sm text-muted-foreground mb-4">
              Manage your saved payment method for faster checkout.
            </p>

            <Button asChild>
              <Link href="/payment-method">
                Manage Payment Method
              </Link>
            </Button>
          </div>
        )
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
      case "Return":
        return <Card title="Return Info" full showEdit={false} />
      default:
        return null
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")

    router.push("/login")
  }

  {/* Rewards */}
  const totalSpent = orders.reduce((total, order) => total + order.subtotal, 0)

  const rewardPoints = Math.floor(totalSpent / 150) * 10
  const amountUntilNextReward = 150 - (totalSpent % 150)
  const progressToNextReward = ((totalSpent % 150) / 150) * 100

  const rewardValue =
    rewardPoints >= 150
      ? "$100 off"
      : rewardPoints >= 100
      ? "$50 off"
      : rewardPoints >= 50
      ? "$25 off"
      : "Keep shopping to unlock rewards"



  return (
    <div className="min-h-screen bg-background px-6 py-6">
      <div className="mx-auto max-w-7xl space-y-5">

      {/* TOP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* LEFT: Profile Info */}
        <div className="flex gap-7">
          
          {/* AVATAR */}
          <div
            className="w-38 h-38 border rounded-md flex items-center justify-center bg-muted cursor-pointer overflow-hidden"
            onClick={() => fileInputRef.current?.click()}
          >
            {avatar ? (
              <img src={avatar} className="w-full h-full object-cover" />
            ) : (
              <span className="text-muted-foreground text-xs text-center px-2">
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
          <div>
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-semibold">
                {firstName || "Username"}
              </h1>

                {/* edit profile */}
              <Link
                href="/profile/edit"
                className="text-sm underline text-muted-foreground hover:text-foreground"
              >
                Edit Profile
              </Link>

                {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm underline text-muted-foreground hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>


            <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-accent text-background">
              Silver Member
            </span>

            <div className="mt-3 space-y-1 text-sm text-muted-foreground">

            {/* Name + Edit Profile (same line) */}
            <div className="flex items-center gap-20">
              <p className="text-foreground font-medium">
                {firstName || "First"} {lastName || "Last"}
              </p>

            </div>

            {/* Address */}
            <p>
              {street || "Street Address"}
              {apartment ? `, ${apartment}` : ""}
            </p>

            <p>
              {city || "City"}
              {state ? `, ${state}` : ""}
              {zip ? ` ${zip}` : ""}
            </p>

          </div>

        </div>
      </div>

    
        {/* RIGHT: Rewards */}
        <div className="flex justify-end w-full mp-2">
        {/* RIGHT: Logout (top-right corner) */}
            <div className="w-full max-w-md border rounded-md p-2 bg-card">
            
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">Rewards</h2>
                <p className="text-xs text-muted-foreground">
                  Earn 10 pts per $150
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-semibold">{rewardPoints} pts</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Next reward</span>
                <span>${Math.max(0, amountUntilNextReward).toFixed(2)} left</span>
              </div>

              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${progressToNextReward}%` }}
                />
              </div>
            </div>

            <div className="mt-3 border rounded-md p-2 text-xs text-muted-foreground">
              {rewardValue}
            </div>
          </div>
      </div>
    </div>


        {/* TABS */}
        <div className="flex flex-wrap border rounded-md overflow-hidden">
          {[
            "My Orders",
            "Payment Method",
            "My Alteration Services",
            "Returns",
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
          <div className="grid md:grid-cols-[1.2fr_1.2fr_0.8fr] gap-6">
            <div className="border rounded-md p-4 h-120 bg-card overflow-y-auto">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-foreground">
                  My Orders
                </h3>

                <Link
                  href="/my-orders"
                  className="text-sm text-accent hover:underline"
                >
                  View all →
                </Link>
              </div>

              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No orders yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {[...orders]
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((order) => (
                      <div
                        key={order.orderNumber}
                        className="border rounded-md p-3 bg-background"
                      >
                        <div className="flex justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium">
                              Order #{order.orderNumber}
                            </p>

                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(order.date).toLocaleString()}
                            </p>

                            <p className="text-sm text-muted-foreground mt-1">
                              Subtotal: ${order.subtotal.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex -space-x-2">
                            {order.items.slice(0, 5).map((item, index) => (
                              <img
                                key={`${item.id}-${index}`}
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-md object-cover border bg-muted"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>


            {/* Recommendations Card */}
            <div className="border rounded-md p-5 h-120 bg-card overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-foreground">
                  Recommended
                </h3>
              </div>

              {recommendedProducts.length === 0 ? (
                <p className="text-md text-muted-foreground">
                  Add favorites or place orders to see recommendations.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {recommendedProducts.slice(0, 6).map((product) => (
                    <div key={product.id}>
                      <ProductCard product={product} showFavorite={false} />
                    </div>
                  ))}
                </div>
              )}
            </div>


          {/* Myy Favorites Card*/}
          <div className="border rounded-md p-3 h-120 bg-card overflow-y-auto">
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

            {favorites.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No favorite items yet.
              </p>
            ) : (
              <div className="space-y-3">
                {favorites.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div>
                      <p className="text-sm text-foreground">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
      className={`border rounded-md p-4 h-96 relative bg-card ${
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