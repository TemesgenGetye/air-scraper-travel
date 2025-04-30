export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-2xl font-bold">Air Scraper Travel</h1>
            </a>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Air Scraper Travel</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At Air Scraper Travel, our mission is to make travel planning simple, affordable, and accessible to
              everyone. We believe that exploring the world should be within reach for all, and we're committed to
              providing the best deals on flights, hotels, and car rentals worldwide.
            </p>

            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 2023, Air Scraper Travel began with a simple idea: to create a travel platform that cuts
              through the complexity and presents users with straightforward, honest pricing and options. Our team of
              travel enthusiasts and technology experts came together to build a service that we ourselves would want to
              use.
            </p>

            <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Transparent Pricing</h3>
                <p className="text-gray-700">
                  We show all fees upfront so there are no surprises when you book. What you see is what you pay.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Comprehensive Search</h3>
                <p className="text-gray-700">
                  Our platform searches hundreds of travel sites to ensure you get the best options available.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">User-Friendly Experience</h3>
                <p className="text-gray-700">
                  We've designed our site to be intuitive and easy to use, saving you time and frustration.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-gray-700">
                  Our customer service team is available around the clock to assist with any questions or issues.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-700 mb-6">
              Our diverse team brings together expertise from the travel industry, technology sector, and customer
              service. We're united by our passion for travel and our commitment to creating the best possible
              experience for our users.
            </p>
          </div>

          <div className="text-center">
            <a
              href="/contact"
              className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white py-10 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Air Scraper Travel</h3>
              <p className="text-gray-400 text-sm">
                Find the best deals on flights, hotels, and car rentals worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/press" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="/partners" className="hover:text-white">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/help" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Subscribe</h4>
              <p className="text-gray-400 text-sm mb-4">Get the latest deals and travel inspiration.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-gray-800 rounded-l-md w-full focus:outline-none"
                />
                <button type="submit" className="bg-gray-800 px-4 py-2 rounded-r-md hover:bg-gray-700">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>&copy; {new Date().getFullYear()} Air Scraper Travel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
