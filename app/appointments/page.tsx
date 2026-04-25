"use client"

import { useEffect, useState } from "react"
import { expertsByZip } from "@/lib/experts"
import { toast } from "sonner"


type Appointment = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  zipcode: string
  service: string
  expert: string
  date: string
  time: string
  createdAt: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]")
    setAppointments(stored)
  }, [])


const getExpert = (zipcode: string, name: string) => {
  const experts = expertsByZip[zipcode] || []
  return experts.find((e) => e.name === name)
}


const cancelAppointment = (id: string) => {
  toast("Are you sure you want to cancel this appointment?", {
    action: {
      label: "Cancel",
      onClick: () => {
        const stored = JSON.parse(localStorage.getItem("appointments") || "[]")

        const updated = stored.filter((appt: Appointment) => appt.id !== id)

        localStorage.setItem("appointments", JSON.stringify(updated))

        setAppointments(updated)

        toast.success("Appointment Cancelled Successfully")
      },
    },
    cancel: {
      label: "Keep Appointment",
      onClick: () => {
        // do nothing
      },
    },
  })
}

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-muted-foreground">
          No appointments found.
        </p>
      ) : (
        <div className="space-y-4">


          {appointments.map((appt) => {
            const expert = getExpert(appt.zipcode, appt.expert)

            

            return (
              <div
                key={appt.id}
                className="border rounded-lg p-5 bg-card"
              >
                <h2 className="font-medium text-lg">
                  {appt.service}
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  {appt.date} at {appt.time}
                </p>

                {expert && (
                  <div className="mt-3 text-sm space-y-1">
                    <p><strong>Expert:</strong> {expert.name}</p>
                    <p>📞<strong>Phone:</strong> {expert.phone}</p>
                    <p>✉️<strong>Email:</strong> {expert.email}</p>
                    <p>📍<strong>Address:</strong> {expert.address}</p>
                  </div>
                )}

                <button
                  onClick={() => cancelAppointment(appt.id)}
                  className="mt-4 text-sm text-red-600 hover:underline"
                >
                  Cancel Appointment
                </button>
              </div>
            )
          })}




        </div>
      )}
    </div>
  )
}