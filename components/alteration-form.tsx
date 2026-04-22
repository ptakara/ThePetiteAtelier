"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { MapPin, Phone, Mail, Clock } from "lucide-react"


type Expert = {
  name: string
  address: string
}

const expertsByZip: Record<string, Expert[]> = {
  "33602": [
    { name: "Alterations World", address: "120 Main St, Tampa, FL 33602" },
    { name: "Alterations by Seamstress Lena", address: "45 River Ave, Tampa, FL 33602" },
    { name: "Tailor Made Alterations", address: "88 Downtown Blvd, Tampa, FL 33602" },
    { name: "Affordable Sewing Services", address: "210 Harbor Rd, Tampa, FL 33602" },
    { name: "Kathleen's Kreations", address: "33 Palm St, Tampa, FL 33602" },
  ],

  "33544": [
    { name: "Ella's Alterations LLC", address: "10 Westview Dr, Wesley Chapel, FL 33544" },
    { name: "Kim's Tailor Shop", address: "55 Oak Ln, Wesley Chapel, FL 33544" },
    { name: "Sew Good", address: "120 Market St, Wesley Chapel, FL 33544" },
    { name: "Alexander's Alterations & Tailoring", address: "9 Heritage Pkwy, Wesley Chapel, FL 33544" },
  ],
}

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
    // Handle form submission
    console.log("[v0] Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact info */}
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
           
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Phone className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Call Us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Mail className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    hello@petiteatelier.com
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact form */}
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

                <Field>
                    {formData.expert && (
                      <div className="mt-3 text-sm text-muted-foreground flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5" />
                        <span>
                        {
                        availableExperts.find(
                        (e) => e.name === formData.expert
                        )?.address
                        }
                        </span>
                      </div>
                  )}
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
