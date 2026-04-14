"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

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
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              {"Contact Us"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Contact us for anytime!
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
              Send us a message
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
                  <FieldLabel className="text-sm font-medium text-foreground">Phone (optional)</FieldLabel>
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
                  <FieldLabel className="text-sm font-medium text-foreground">Message</FieldLabel>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 min-h-[120px]"
                    required
                  />
                </Field>
              </FieldGroup>

              <Button type="submit" size="lg" className="w-full bg-foreground text-background hover:bg-foreground/90">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
