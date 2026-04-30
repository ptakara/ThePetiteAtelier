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
  status?: "Delivered" | "Return Requested" | "Returned" | "Refunded"
  returnItems?: OrderItem[]
  returnMethod?: "Print Label at Home" | "Digital QR Code"
  refundMethod?: "Original Card" | "Website Credit"
  returnDate?: string
  returnDeadline?: string
  estimatedRefund?: number
}

type SavedPayment = {
  nickname: string
  type: "credit-card"
  cardholderName: string
  last4: string
  expiration: string
  brand: string
}


export default function ProfilePage() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("My Orders")
  const [avatar, setAvatar] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [birthdayMonth, setBirthdayMonth] = useState("")
  const [birthdayDay, setBirthdayDay] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [showPasswordPopup, setShowPasswordPopup] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [atelierEmails, setAtelierEmails] = useState(true)
  const [atelierTexts, setAtelierTexts] = useState(true)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

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
  const [savedPayment, setSavedPayment] = useState<SavedPayment[]>([])


  // Effect//
  // Load saved data safely
  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (isLoggedIn !== "true") {
      router.push("/login?redirect=/profile")
      return
    }

    const savedAvatar = localStorage.getItem("avatar")
    const savedFirstName = localStorage.getItem("firstName")
    const savedLastName = localStorage.getItem("lastName")
    if (savedAvatar) setAvatar(savedAvatar)
    if (savedFirstName) setFirstName(savedFirstName)
    if (savedLastName) setLastName(savedLastName)
  
    const savedEmail = localStorage.getItem("userEmail")
      if (savedEmail) setEmail(savedEmail)
    
    const savedBirthdayMonth = localStorage.getItem("birthdayMonth")
    const savedBirthdayDay = localStorage.getItem("birthdayDay")
    const savedMobileNumber = localStorage.getItem("mobileNumber")
    if (savedBirthdayMonth) setBirthdayMonth(savedBirthdayMonth)
    if (savedBirthdayDay) setBirthdayDay(savedBirthdayDay)
    if (savedMobileNumber) setMobileNumber(savedMobileNumber)

    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(savedFavorites)
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(savedOrders)
  

    const storedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    )
    setAppointments(storedAppointments)

  const storedPayments = localStorage.getItem("savedPayments")
  if (storedPayments) {
    setSavedPayment(JSON.parse(storedPayments))
  }

  setIsCheckingAuth(false)

  }, [])


    const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
    const [orders, setOrders] = useState<Order[]>([])
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

  const returnOrders = orders.filter(
    (order) =>
      order.status === "Return Requested" ||
      order.status === "Returned" ||
      order.status === "Refunded"
  )




  {/* Render Tab Content */}
  const renderTabContent = () => {
    switch (activeTab) {
      case "Payment Method":
        return (
        <div className="border rounded-md p-6 bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-foreground">
                Payment Method
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Manage your saved payment methods for faster checkout here:  < a href="/payment-method " className="underline text-sm" > Manage Payments</a>
              </p>
            </div>

          </div>
          {savedPayment.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No saved cards yet.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {savedPayment.map((card, index) => (
                <div
                  key={index}
                  className="rounded-md border bg-background p-4"
                >
                  {/*creditcard icon */}
                  <img
                    src={`/images/${card.brand}.png`}
                    alt={card.brand}
                    className="h-6 w-10 object-contain"
                  />

                  <p className="font-medium">
                    {card.nickname}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Card ending in **** {card.last4}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {card.cardholderName}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Expires {card.expiration}
                  </p>
                </div>
              ))}
            </div>
          )}
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
      case "Returns":
          const returnOrders = orders.filter(
            (order) => order.status === "Return Requested"
          )
          const cancelReturnItem = (orderNumber: string, itemId: number) => {
            const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")

            const updatedOrders = savedOrders.map((order: any) => {
              if (order.orderNumber !== orderNumber) return order

              const updatedReturnItems = (order.returnItems || []).filter(
                (item: any) => item.id !== itemId
              )

              return {
                ...order,
                returnItems: updatedReturnItems,
                status: updatedReturnItems.length > 0 ? "Return Requested" : "Delivered",
                estimatedRefund: updatedReturnItems.reduce(
                  (total: number, item: any) =>
                    total + item.price * (item.quantity || 1),
                  0
                ),
                returnMethod: updatedReturnItems.length > 0 ? order.returnMethod : "",
                refundMethod: updatedReturnItems.length > 0 ? order.refundMethod : "",
                returnDate: updatedReturnItems.length > 0 ? order.returnDate : "",
                returnDeadline: updatedReturnItems.length > 0 ? order.returnDeadline : "",
              }
            })

            localStorage.setItem("orders", JSON.stringify(updatedOrders))
            setOrders(updatedOrders)
          }

          return (
            <div className="border rounded-md p-6 bg-card">
              <h3 className="font-medium text-foreground mb-4">
                Returns
              </h3>

              {returnOrders.length === 0 ? (
                <div className="text-center py-10">
                  <h4 className="text-lg font-medium mb-2">
                    No returns yet
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    When you request a return, it will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {returnOrders.map((order) => (
                    <div
                      key={order.orderNumber}
                      className="border rounded-md p-4 bg-background"
                    >
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="font-medium">
                            Order #{order.orderNumber}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Status: {order.status}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Return method: {order.returnMethod}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Refund method: {order.refundMethod}
                          </p>

                          {order.returnDeadline && (
                            <p className="text-sm text-muted-foreground">
                              Drop off by:{" "}
                              {new Date(order.returnDeadline).toLocaleDateString()}
                            </p>
                          )}

                          <p className="text-sm text-muted-foreground">
                            Estimated refund: ${order.estimatedRefund?.toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 space-y-3">
                          {order.returnItems?.map((item, index) => (
                            <div
                              key={`${item.id}-${index}`}
                              className="flex items-center justify-between gap-4 rounded-md border p-3"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-14 h-14 rounded-md object-cover border bg-muted"
                                />

                                <div>
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Size: {item.selectedSize}
                                  </p>

                                  {item.selectedLength && (
                                    <p className="text-xs text-muted-foreground">
                                      Length: {item.selectedLength}
                                    </p>
                                  )}

                                  <p className="text-xs text-muted-foreground">
                                    Qty: {item.quantity || 1}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                onClick={() => cancelReturnItem(order.orderNumber, item.id)}
                              >
                                Cancel Return
                              </Button>
                            </div>
                          ))}
                        </div>


                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
                        
      case "Account Settings":
        return (
          <div className="space-y-4">
            {/* Password Card */}
            <div className="border rounded-md p-6 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Password</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ********
                  </p>
                </div>

                <button
                  onClick={() => setShowPasswordPopup(true)}
                  className="text-sm underline text-muted-foreground hover:text-foreground"
                >
                  Edit
                </button>
              </div>
            </div>


            {/* Communication Preferences Card */}
            <div className="border rounded-md p-6 bg-card">
              <h3 className="font-medium text-foreground mb-4">
                Communication Preferences
              </h3>

              <div className="space-y-4">
               <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">The Petite Atelier Emails</p>
                  <p className="text-xs text-muted-foreground">
                    Receive offers and alerts by email
                  </p>
                </div>

                  <button
                    onClick={() => setAtelierEmails(!atelierEmails)}
                    className={`px-4 py-1 rounded-full text-sm ${
                      atelierEmails
                        ? "bg-accent text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {atelierEmails ? "On" : "Off"}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">The Petite Atelier Texts</p>
                    <p className="text-xs text-muted-foreground">
                      Receive offers and alerts by text
                    </p>
                  </div>

                  <button
                    onClick={() => setAtelierTexts(!atelierTexts)}
                    className={`px-4 py-1 rounded-full text-sm ${
                      atelierTexts
                        ? "bg-accent text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {atelierTexts ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/login")
    window.dispatchEvent(new Event("authChanged"))
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


  if (isCheckingAuth) {
    return null
  }


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
              <p className="text-foreground">
                Name: {firstName || "First"} {lastName || "Last"}
              </p>
            </div>

            {/* Birthday */}
            <p>
              {birthdayMonth && birthdayDay
                ? `Birthday: ${birthdayMonth} ${birthdayDay}`
                : "Birthday"}
            </p>
            
            {/* Mobile Number */}
            <p>
              Mobile Number: {mobileNumber || "Mobile Number"}
            </p>

            {/* Email */}
            <p>
              Email: {email}
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
            "Account Settings",
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
                 <Link
  href={`/my-orders?order=${order.orderNumber}`}
  key={order.orderNumber}
  className="block border rounded-md p-3 bg-background hover:bg-muted/40 transition cursor-pointer"
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
                      </Link>


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

                  <Link href={`/shop/${item.category}/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md cursor-pointer"
                    />
                  </Link>

                  <div>
                    <Link href={`/shop/${item.category}/${item.id}`}>
                      <p className="text-sm text-foreground hover:underline cursor-pointer">
                        {item.name}
                      </p>
                    </Link>

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


      {/*Update Password popup */}
      {showPasswordPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-md border rounded-md bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">
              Edit Password
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 bg-background"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 bg-background"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full border rounded-md px-3 py-2 bg-background"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPasswordPopup(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  if (newPassword !== confirmPassword) {
                    alert("New password and confirm password do not match.")
                    return
                  }

                  localStorage.setItem("userPassword", newPassword)
                  setShowPasswordPopup(false)
                  setCurrentPassword("")
                  setNewPassword("")
                  setConfirmPassword("")
                  setShowSuccessPopup(true)          }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}


      {/*Saved new password popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-sm border rounded-md bg-card p-6 text-center">
            <h3 className="text-lg font-semibold mb-3">
              Success
            </h3>

            <p className="text-sm text-muted-foreground mb-5">
              Your password has been updated successfully.
            </p>

            <Button onClick={() => setShowSuccessPopup(false)}>
              OK
            </Button>
          </div>
        </div>
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