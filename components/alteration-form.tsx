"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { MapPin, Phone, Mail, Clock } from "lucide-react"



const expertsByZip: Record<string, string[]> = {
  "33602": ["Alterations World", "Alterations by Seamstress Lena", "Tailor Made Alterations", "Affordable Sewing Services", "Kathleen's Kreations"],
  "33544": [" Ella's Alterations LLC", "Kim's Tailor Shop", "Sew Good", "Alexander's Alterations & Tailoring"],
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
  })

  const availableExperts = expertsByZip[formData.zipcode] || []

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
                          <option key={expert} value={expert}>
                            {expert}
                          </option>
                        ))}
                      </select>
                </Field>
              </FieldGroup>

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
