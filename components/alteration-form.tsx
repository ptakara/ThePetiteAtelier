"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import dynamic from "next/dynamic"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ExpertMap } from "@/components/expert-map"
import { toast } from "sonner"


type Expert = {
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  email: string
}

const expertsByZip: Record<string, Expert[]> = {
  "33602": [
    {
      name: "Alterations World",
      address: "120 Main St, Tampa, FL 33602",
      lat: 27.9506,
      lng: -82.4572,
      phone: "(813) 555-1001",
      email: "alterationsworld@example.com",
    },
    {
      name: "Alterations by Seamstress Lena",
      address: "45 River Ave, Tampa, FL 33602",
      lat: 27.9489,
      lng: -82.4586,
      phone: "(813) 555-1002",
      email: "lena.alterations@example.com",
    },
    {
      name: "Tailor Made Alterations",
      address: "88 Downtown Blvd, Tampa, FL 33602",
      lat: 27.9518,
      lng: -82.4561,
      phone: "(813) 555-1003",
      email: "tailormade@example.com",
    },
    {
      name: "Affordable Sewing Services",
      address: "210 Harbor Rd, Tampa, FL 33602",
      lat: 27.9467,
      lng: -82.4599,
      phone: "(813) 555-1004",
      email: "affordablesewing@example.com",
    },
    {
      name: "Kathleen's Kreations",
      address: "33 Palm St, Tampa, FL 33602",
      lat: 27.9532,
      lng: -82.4553,
      phone: "(813) 555-1005",
      email: "kathleen.kreations@example.com",
    },
  ],

  "33544": [
    {
      name: "Ella's Alterations LLC",
      address: "10 Westview Dr, Wesley Chapel, FL 33544",
      lat: 28.1871,
      lng: -82.3563,
      phone: "(813) 555-2001",
      email: "ellas.alterations@example.com",
    },
    {
      name: "Kim's Tailor Shop",
      address: "55 Oak Ln, Wesley Chapel, FL 33544",
      lat: 28.1862,
      lng: -82.3581,
      phone: "(813) 555-2002",
      email: "kim.tailorshop@example.com",
    },
    {
      name: "Sew Good",
      address: "120 Market St, Wesley Chapel, FL 33544",
      lat: 28.1884,
      lng: -82.3549,
      phone: "(813) 555-2003",
      email: "sewgood@example.com",
    },
    {
      name: "Alexander's Alterations & Tailoring",
      address: "9 Heritage Pkwy, Wesley Chapel, FL 33544",
      lat: 28.1855,
      lng: -82.3592,
      phone: "(813) 555-2004",
      email: "alexanders.tailoring@example.com",
    },
  ],
};

export function AlterationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipcode: "",
    service: "",
    expert: "",
    date: "",
    time: "",
  })

  const availableExperts = expertsByZip[formData.zipcode] || []

  const selectedExpert = availableExperts.find(
      (e) => e.name === formData.expert
    )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Form submitted:", formData)

    const existing = JSON.parse(localStorage.getItem("appointments") || "[]")

    const newAppointment = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(
      "appointments",
      JSON.stringify([...existing, newAppointment])
    )

    toast.success("Appointment submitted successfully!", {
      description: (
        <div className="mt-2 flex gap-3">
          <a href="/appointments" className="underline text-sm">
            View My Appointments
          </a>
        </div>
      ),
    })

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      zipcode: "",
      service: "",
      expert: "",
      date: "",
      time: "",
    })

  }


  return (
    <section id="contact" className="py-10 lg:py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Alteration Services Intro */}
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-3">
              Alteration Services
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              {"Let's elevate your experience with perfectly tailored fashion"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Ready to experience perfectly fitted fashion? Book an appointment with one of our many expert tailors today.
            </p>

            <div className="mt-10 space-y-6">
           
          
            {/* Phone and Email of Expert Selected */}
            {selectedExpert && (
              <div className="mt-6 space-y-6">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Phone className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Call  </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedExpert.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <Mail className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedExpert.email}
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* Display Map */}
            {selectedExpert && (
              <div className="mt-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Address</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedExpert.address}
                    </p>
                  </div>
                </div>

                <ExpertMap
                  lat={selectedExpert.lat}
                  lng={selectedExpert.lng}
                  name={selectedExpert.name}
                />
              </div>
            )}      
            </div>
          </div>


          {/* Appointment form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="font-serif text-xl font-medium text-foreground mb-6">
              Fill out the form:
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">

                {/* Name */}
                <FieldGroup>
                  <Field>
                    <FieldLabel className="text-sm font-medium text-foreground">First Name</FieldLabel>
                    <Input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </Field>
                </FieldGroup>
                <FieldGroup>
                  <Field>
                    <FieldLabel className="text-sm font-medium text-foreground">Last Name</FieldLabel>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </Field>
                </FieldGroup>
              </div>

              {/* Email */}
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-sm font-medium text-foreground">Email</FieldLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                    required
                  />
                </Field>
              </FieldGroup>

              {/* Phone */}
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-sm font-medium text-foreground">Phone</FieldLabel>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2"
                  />
                </Field>
              </FieldGroup>

              {/* Zip Code */}
              <FieldGroup>
                <Field> 
                  <FieldLabel className="text-sm font-medium text-foreground"> ZIP Code (33602 or 33544)  </FieldLabel>
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={formData.zipcode}
                    onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                    className="mt-2"
                    required
                  />
                </Field>
              </FieldGroup>


            {/* Expert Selection */}
            {formData.zipcode && (
            <>
              <FieldGroup> 
                <Field>
                  <FieldLabel className="text-sm font-medium text-foreground">Expert Selection</FieldLabel>
                    <select
                      value={formData.expert}
                      onChange={(e) => setFormData({ ...formData, expert: e.target.value })}
                      className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      required
                      disabled={!formData.zipcode}
                    >
                      <option value="">
                        {formData.zipcode ? "Select an expert" : "Enter ZIP first"}
                      </option>
                          
                      {availableExperts.map((expert) => (
                        <option key={expert.name} value={expert.name}>
                          {expert.name}
                        </option>
                      ))}
                    </select>
                </Field>
              </FieldGroup>

              
              {/* Service Type */}
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-sm font-medium text-foreground">Service Type</FieldLabel>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="hem">Hem Adjustments</option>
                        <option value="taking-in">Taking In / Letting Out</option>
                        <option value="express">Express Service</option>
                        <option value="restyle">Complete Restyle</option>
                      </select>
                </Field>
              </FieldGroup>


              {/* Date Selection */}
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-sm font-medium text-foreground">
                    Preferred Date
                  </FieldLabel>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="mt-2"
                    required
                  />
                </Field>
              </FieldGroup>

              {/* Time Selection */}
              <FieldGroup>
                <Field>
                  <FieldLabel className="text-sm font-medium text-foreground">Select Time</FieldLabel>
                    <select
                      value={formData.time}
                      onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                      }
                      className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">Select a time</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="01:00">01:00 PM</option>
                      <option value="02:00">02:00 PM</option>
                      <option value="03:00">03:00 PM</option>
                      <option value="04:00">04:00 PM</option>
                      <option value="05:00">05:00 PM</option>
                      <option value="06:00">06:00 PM</option> 
                    </select>
                </Field>
              </FieldGroup> 
            </>
            )}

              <Button type="submit" size="lg" className="w-full bg-foreground text-background hover:bg-foreground/90">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
