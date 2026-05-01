// app/login/page.tsx

"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get("redirect") || "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (email === "user1@gmail.com" && password === "user123") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      window.dispatchEvent(new Event("authChanged"))

      router.push(redirect)
    } else {
      alert("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-background px-4 pt-24">
      <div className="w-full max-w-md border rounded-md p-8 bg-card">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Log In
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourEmail@example.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  )
}