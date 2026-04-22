"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"
import { memo } from "react"

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

function ExpertMapBase({
  lat,
  lng,
  name,
}: {
  lat: number
  lng: number
  name: string
}) {
  return (
    <div className="mt-4 rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        style={{ height: "310px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>{name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
export const ExpertMap = memo(ExpertMapBase, (prev, next) => {
  return (
    prev.lat === next.lat &&
    prev.lng === next.lng &&
    prev.name === next.name
  )
})