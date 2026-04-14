import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, Ruler, Clock, Star } from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Hem Adjustments",
    description: "Perfect trouser, dress, and skirt lengths tailored to your height.",
    price: "From $25",
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
    <section id="alterations" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src="/images/alteration-service.jpg"
                alt="Professional tailor working on garment alterations"
                fill
                className="object-cover"
              />
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -right-6 bg-background border border-border rounded-lg p-6 shadow-lg hidden md:block">
              <div className="text-center">
                <p className="font-serif text-3xl font-medium text-foreground">15+</p>
                <p className="text-sm text-muted-foreground mt-1">Years of Expertise</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-3">
              Expert Alterations
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Tailored to perfection
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Not finding petite sizes? Our master tailors can transform any garment to fit 
              your proportions perfectly. From simple hems to complete restructuring, we ensure 
              every piece looks like it was made just for you.
            </p>

            {/* Services grid */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <div key={service.title} className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{service.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                      <p className="mt-2 text-sm font-medium text-accent">{service.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="mt-10 bg-foreground text-background hover:bg-foreground/90">
              <Link href="/book-consultation">
                Book a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
