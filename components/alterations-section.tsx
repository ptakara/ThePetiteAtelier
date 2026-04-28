import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, Ruler, Clock, Star } from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Hem Adjustments",
    description: "Perfect trouser, dress, and skirt lengths tailored to your height.",
    price: "From $25-45",
  },
  {
    icon: Ruler,
    title: "Taking In & Letting Out",
    description: "Precise adjustments to achieve the perfect fit around waist and hips.",
    price: "From $35",
  },
  {
    icon: Clock,
    title: "Express Service",
    description: "Need it quickly? Same-day alterations available for simple adjustments.",
    price: "+$20",
  },
  {
    icon: Star,
    title: "Complete Restyle",
    description: "Transform existing pieces into petite-proportioned garments.",
    price: "From $75",
  },
]

export function AlterationsSection() {
  return (
    <section id="alterations" className="py-20 lg:py-45">
      <div className="mx-auto max-w-6x2 px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg bg-muted">
              <Image
                src="/images/alteration-service.jpg"
                alt="Professional tailor working on garment alterations"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Tailored to perfection
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Not finding petite sizes? Our master tailors can transform any garment to fit 
              your proportions perfectly. From simple hems to complete restructuring, we ensure 
              every piece looks like it was made just for you.
            </p>

            {/* Services grid */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {services.map((service) => (
                <div key={service.title} className="group">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{service.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
                      <p className="mt-3 text-sm font-medium text-accent">{service.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 w-full">
              <Button
                asChild
                size="lg"
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                <Link href="/book-consultation">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
