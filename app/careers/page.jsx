export default function Careers() {
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
          <h1 className="text-4xl font-bold mb-8 text-center">Join Our Team</h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Why Work With Us</h2>
            <p className="text-gray-700 mb-6">
              At Air Scraper Travel, we're building the future of travel planning. We're a team of passionate
              individuals who are committed to making travel accessible, affordable, and enjoyable for everyone. If
              you're looking for a challenging and rewarding career in a fast-paced environment, we'd love to hear from
              you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-800 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-gray-700">
                  We're constantly pushing the boundaries of what's possible in travel technology.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-800 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="font-bold text-lg mb-2">Collaboration</h3>
                <p className="text-gray-700">
                  We work together across teams to solve complex problems and deliver exceptional results.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-800 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <h3 className="font-bold text-lg mb-2">Global Impact</h3>
                <p className="text-gray-700">
                  Our work helps millions of travelers around the world discover new destinations and experiences.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Benefits & Perks</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Competitive salary and equity packages
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Comprehensive health, dental, and vision insurance
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Generous paid time off and flexible work arrangements
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Annual travel stipend for personal adventures
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Professional development and learning opportunities
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-800 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Modern office with snacks, drinks, and team events
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Senior Full Stack Developer</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">Full-time</span>
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">Remote</span>
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">Engineering</span>
              </div>
              <p className="text-gray-700 mb-4">
                We're looking for an experienced Full Stack Developer to join our engineering team. You'll be working on
                our core travel search platform, building new features and improving performance.
              </p>
              <a
                href="/careers/senior-full-stack-developer"
                className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                View Details
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">UX/UI Designer</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">Full-time</span>
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">San Francisco</span>
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">Design</span>
              </div>
              <p className="text-gray-700 mb-4">
                We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our travel
                platform. You'll work closely with product managers and engineers to deliver exceptional user
                experiences.
              </p>
              <a
                href="/careers/ux-ui-designer"
                className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                View Details
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Product Marketing Manager</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">Full-time</span>
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">New York</span>
                <span className="bg-gray-200 text-gray-800 text-xs px-3 py-1 rounded-full">Marketing</span>
              </div>
              <p className="text-gray-700 mb-4">
                We're looking for a Product Marketing Manager to help us tell our story and grow our user base. You'll
                develop marketing strategies, create compelling content, and work with our product team on launches.
              </p>
              <a
                href="/careers/product-marketing-manager"
                className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                View Details
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Don't see a position that matches your skills? We're always looking for talented people to join our team.
            </p>
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
