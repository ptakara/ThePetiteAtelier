export default function getFavorites(): string[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("favorites") || "[]")
}

export function toggleFavorite(id: string) {
  const favorites = getFavorites()

  let updated
  if (favorites.includes(id)) {
    updated = favorites.filter((fav) => fav !== id)
  } else {
    updated = [...favorites, id]
  }

  localStorage.setItem("favorites", JSON.stringify(updated))
  return updated
}

export function isFavorite(id: string) {
  return getFavorites().includes(id)
}