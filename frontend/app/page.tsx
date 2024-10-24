import Link from 'next/link'
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { QrCode, CreditCard, Utensils, Laptop, Printer, Smartphone, ChefHat, BarChart, Clock, Users, Star, ChevronDown } from "lucide-react"
import { ModeToggle } from "@/components/component/dark-mode-toggle"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function HomePage() {
  return (
    <ThemeProvider attribute="class">

      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Utensils className="h-8 w-8 text-primary dark:text-primary-400" />
            <span className="text-2xl font-bold text-primary dark:text-primary-400">Triangle</span>
          </div>
          <nav className="flex items-center space-x-4">
            <ModeToggle />
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Revolutionize Your Restaurant Experience
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Streamline ordering and payments with our QR code menu system. Perfect for restaurants of all sizes.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/register">Get Started for Free</Link>
            </Button>
          </section>

          <section className="mb-16 mb-36">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Laptop, title: "Create your Triangle Online ordering page", description: "All ordering pages offer an app-like experience for easy browsing, ordering, and payment on mobile." },
                { icon: Printer, title: "Generate and print your QR codes", description: "Each QR code is uniquely mapped to one of your tables, walk-up windows, parking spots, or other ordering locations." },
                { icon: Smartphone, title: "Diners scan QR codes to open your ordering page", description: "Guests can order, add notes, and pay immediately or keep ordering on the same tab." },
                { icon: ChefHat, title: "Orders go to your POS and kitchen printers", description: "Your staff can prep and run orders, or you can provide guests with instructions on where to pick them up." },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                  <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full mb-4">
                    <step.icon className="h-8 w-8 text-primary dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
                  <h4 className="text-lg font-medium mb-2">{step.title}</h4>
                  <p className="text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BarChart, title: "Analytics Dashboard", description: "Get insights into your most popular dishes, peak hours, and customer preferences." },
                { icon: Clock, title: "Real-time Updates", description: "Instantly update menu items, prices, and availability across all devices." },
                { icon: Users, title: "Customer Profiles", description: "Build customer loyalty with personalized experiences and recommendations." },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                  <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-primary dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <Carousel>
            <CarouselContent>
              {[{
                name: "John Doe", 
                role: "Restaurant Owner", 
                quote: "DineEase has transformed our ordering process. Our customers love the convenience, and we've seen a 30% increase in table turnover."
              },
              {
                name: "Jane Smith", 
                role: "Cafe Manager", 
                quote: "The QR code menus have been a game-changer for us. We can update our specials instantly, and it's reduced our printing costs significantly."
              },
              {
                name: "Mike Johnson", 
                role: "Bar Owner", 
                quote: "The payment integration is seamless. We've noticed fewer errors in orders and faster payment processing, which our customers appreciate."
              }].map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <Star className="h-8 w-8 text-yellow-400 mb-4" />
                    <p className="text-sm mb-4">"{testimonial.quote}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>


          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {[
                { question: "How does the QR code menu system work?", answer: "Customers scan a unique QR code at their table using their smartphone camera. This opens a digital menu where they can browse, order, and pay directly from their device." },
                { question: "Is it difficult to set up?", answer: "Not at all! We provide a user-friendly dashboard where you can easily upload your menu, customize designs, and generate QR codes. Our support team is also available to assist you every step of the way." },
                { question: "Can I update my menu in real-time?", answer: "Yes! You can make changes to your menu items, prices, or availability instantly through our dashboard. These changes are reflected immediately on the digital menu." },
                { question: "How secure are the payments?", answer: "We use industry-standard encryption and secure payment gateways to ensure all transactions are safe and protected. We comply with PCI DSS standards for handling credit card information." },
                { question: "Do I need special hardware?", answer: "No special hardware is required. You only need a device (computer, tablet, or smartphone) to manage your dashboard and a printer to print out the QR codes for your tables." },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>


          <section className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Restaurant?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of restaurants already using DineEase to streamline their operations and enhance customer experience.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/register">Sign Up Now - Free 30-Day Trial</Link>
            </Button>
          </section>
        </main>

        <footer className="bg-primary-200 dark:bg-gray-700 py-12 mt-12">
          <div className="container mx-auto px-4 grid justify-center gap-12 md:grid-cols-2 lg:grid-cols-3 align-middle">
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/blog">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: support@dineease.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Restaurant St, Foodville, FK 12345</li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-300 dark:border-gray-600 text-center text-sm">
            © 2024 DineEase. All rights reserved.
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}