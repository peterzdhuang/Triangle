import Link from 'next/link'

export function Footer() {
  return (
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
  )
}