import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What qualifies as petite sizing?",
    answer: "Petite sizing is designed for women 5&apos;4\" and under. Our clothing features shorter inseams, proportioned sleeves, and balanced torso lengths to fit petite frames without alterations."
  },
  {
    question: "How long do alterations typically take?",
    answer: "Standard alterations take 3-5 business days. Express service is available for simple adjustments like hems, with same-day or next-day turnaround for an additional fee."
  },
  {
    question: "Do you offer virtual styling consultations?",
    answer: "Yes! Book a complimentary 30-minute virtual session with our stylists who specialize in dressing petite frames. We&apos;ll help you find pieces that work for your proportions."
  },
  {
    question: "What is your return policy?",
    answer: "We offer free returns within 30 days of purchase for unworn items with tags attached. Altered items can be exchanged for the same item in a different size."
  },
  {
    question: "Can you alter clothing from other brands?",
    answer: "Absolutely! Our tailoring services aren&apos;t limited to our pieces. Bring in any garment and we&apos;ll work our magic to make it fit your petite proportions perfectly."
  },
]

export function StorySection() {
  return (
    <section id="story" className="py-20 lg:py-18 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Story content */}
          <div>
            <p className="text-sm font-medium tracking-widest text-accent uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-foreground">
              Celebrating petite beauty since 2010
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Petite Atelier was born from a simple frustration: why should petite women 
                have to compromise on style or pay extra for basic alterations?
              </p>
              <p>
                Founded by petite women for petite women, we design every piece from the 
                ground up with proportions that work. No rolling up sleeves, no dragging hems, 
                no boxy fits.
              </p>
              <p>
                Our in-house atelier combines timeless design with expert tailoring, 
                offering both ready-to-wear pieces and bespoke alterations to ensure you 
                never have to settle for &quot;close enough.&quot;
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-serif text-2xl font-medium text-foreground mb-6">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-accent hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button
              asChild
              size="lg"
              className="mt-10 bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
