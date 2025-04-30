export default function Footer() {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sky Scrapper Travel</h3>
            <p className="text-gray-400 text-sm">Find the best deals on flights, hotels, and car rentals worldwide.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
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
          <p>&copy; {new Date().getFullYear()} Sky Scrapper Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
