import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-7 lg:py-11">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-4">
              Designed for Petite Frames
            </p>
            <h1 className="font-serif text-4xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-foreground text-balance">
              Perfect fit meets exquisite design
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">
              Transform your wardrobe with clothing crafted specifically for petite proportions.
              Every piece is thoughtfully designed to fit and flatter your frame beautifully.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                <Link href="#shop">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                <Link href="/book-consultation">
                  Alteration Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative flex justify-center">
            <div className="w-4/6 lg:w-6/8">
              <div className="aspect-[8/8] overflow-hidden rounded-lg bg-muted">
                <Image
                  src="/images/hero-model.jpg"
                  alt="Model wearing petite tailored clothing"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
