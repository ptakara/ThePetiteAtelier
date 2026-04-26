//components/products-filters.tsx

"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useState } from "react"

const sizes = ["XXS","XS", "S", "M", "L", "XL"]
const colors = ["Black", "White", "Blue", "Green", "Orange", "Brown", "Beige", "Red", "Grey", "Gold",]
const fabrics = ["Cotton", "Silk", "Denim", "Wool", "Satin", "Linen"]
const lengths = ["X-Short (28\")", "Short (30\")", "Regular (32\")"]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const isChecked = (key: string, value: string) => {
    const existing = searchParams.get(key)
    if (!existing) return false
    return existing.split(",").includes(value)
}

  const [open, setOpen] = useState({
    size: true,
    color: false,
    fabric: false,
    length: false,
  })

  const toggleSection = (key: keyof typeof open) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }))
  }

    const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    const existing = params.get(key)

    if (!existing) {
        params.set(key, value)
    } else {
        const values = existing.split(",")

        if (values.includes(value)) {
        const updated = values.filter(v => v !== value)

        updated.length
            ? params.set(key, updated.join(","))
            : params.delete(key)
        } else {
        values.push(value)
        params.set(key, values.join(","))
        }
    }

    router.push(`${pathname}?${params.toString()}`)
    }
  const current = (key: string) => searchParams.get(key)

  return (
    <div className="w-64 space-y-4">

      {/* SIZE */}
      <div className="border rounded-lg p-3">
        <button
          className="w-full text-left font-semibold flex justify-between"
          onClick={() => toggleSection("size")}
        >
          Size
          <span>{open.size ? "−" : "+"}</span>
        </button>

        {open.size && (
          <div className="mt-2 space-y-1">
            {sizes.map(size => (
              <label key={size} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked("size", size)}
                  onChange={() => updateFilter("size", size)}
                />
                {size}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* COLOR */}
      <div className="border rounded-lg p-3">
        <button
          className="w-full text-left font-semibold flex justify-between"
          onClick={() => toggleSection("color")}
        >
          Color
          <span>{open.color ? "−" : "+"}</span>
        </button>

        {open.color && (
          <div className="mt-2 space-y-1">
            {colors.map(color => (
              <label key={color} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked("color", color)}
                  onChange={() => updateFilter("color", color)}
                />
                {color}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* FABRIC */}
      <div className="border rounded-lg p-3">
        <button
          className="w-full text-left font-semibold flex justify-between"
          onClick={() => toggleSection("fabric")}
        >
          Fabric
          <span>{open.fabric ? "−" : "+"}</span>
        </button>

        {open.fabric && (
          <div className="mt-2 space-y-1">
            {fabrics.map(fabric => (
              <label key={fabric} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isChecked("fabric", fabric)}
                  onChange={() => updateFilter("fabric", fabric)}
                />
                {fabric}
              </label>
            ))}
          </div>
        )}
      </div>

        {/* LENGTH - only for dresses and bottoms */}
        {(pathname.includes("/shop/dresses") || pathname.includes("/shop/bottoms")) && (
        <div className="border rounded-lg p-3">
            <button
            className="w-full text-left font-semibold flex justify-between"
            onClick={() => toggleSection("length")}
            >
            Length (Inseam)
            <span>{open.length ? "−" : "+"}</span>
            </button>

            {open.length && (
            <div className="mt-2 space-y-1">
                {lengths.map(length => (
                <label key={length} className="flex items-center gap-2 text-sm">
                    <input
                    type="checkbox"
                    checked={isChecked("length", length)}
                    onChange={() => updateFilter("length", length)}
                    />
                    {length}
                </label>
                ))}
            </div>
            )}
        </div>
        )}












    </div>
  )
}