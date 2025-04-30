"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function HotelSearchResults() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("recommended")
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    starRating: [],
    amenities: [],
  })

  // Helper function to calculate nights between two dates
  function calculateNights(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 1

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    const diffTime = Math.abs(checkOutDate - checkInDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays || 1
  }

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true)

        const destination = searchParams.get("destination")
        const checkIn = searchParams.get("checkIn")
        const checkOut = searchParams.get("checkOut")
        const rooms = searchParams.get("rooms") || 1
        const adults = searchParams.get("adults") || 1
        const children = searchParams.get("children") || 0

        // In a real application, you would call the API with these parameters
        // For this example, we'll use mock data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock hotel data
        const mockHotels = [
          {
            id: "1",
            name: "Grand Hotel Plaza",
            location: destination || "New York",
            address: "123 Main Street",
            starRating: 5,
            userRating: 4.8,
            reviewCount: 1245,
            price: 299,
            pricePerNight: 299,
            totalPrice: 299 * (rooms || 1) * (calculateNights(checkIn, checkOut) || 1),
            thumbnail: "/placeholder.svg",
            amenities: ["Free Wi-Fi", "Pool", "Spa", "Fitness Center", "Restaurant", "Room Service", "Parking"],
            distanceFromCenter: "0.5 km",
          },
          {
            id: "2",
            name: "Boutique Residence",
            location: destination || "New York",
            address: "456 Park Avenue",
            starRating: 4,
            userRating: 4.5,
            reviewCount: 876,
            price: 199,
            pricePerNight: 199,
            totalPrice: 199 * (rooms || 1) * (calculateNights(checkIn, checkOut) || 1),
            thumbnail: "/placeholder.svg",
            amenities: ["Free Wi-Fi", "Pool", "Restaurant", "Parking"],
            distanceFromCenter: "0.8 km",
          },
          {
            id: "3",
            name: "Luxury Suites Downtown",
            location: destination || "New York",
            address: "789 Broadway",
            starRating: 5,
            userRating: 4.9,
            reviewCount: 2103,
            price: 349,
            pricePerNight: 349,
            totalPrice: 349 * (rooms || 1) * (calculateNights(checkIn, checkOut) || 1),
            thumbnail: "/placeholder.svg",
            amenities: [
              "Free Wi-Fi",
              "Pool",
              "Spa",
              "Fitness Center",
              "Restaurant",
              "Room Service",
              "Parking",
              "Business Center",
            ],
            distanceFromCenter: "0.3 km",
          },
          {
            id: "4",
            name: "Urban Inn Express",
            location: destination || "New York",
            address: "321 Fifth Avenue",
            starRating: 3,
            userRating: 4.2,
            reviewCount: 567,
            price: 149,
            pricePerNight: 149,
            totalPrice: 149 * (rooms || 1) * (calculateNights(checkIn, checkOut) || 1),
            thumbnail: "/placeholder.svg",
            amenities: ["Free Wi-Fi", "Fitness Center", "Restaurant"],
            distanceFromCenter: "1.2 km",
          },
          {
            id: "5",
            name: "Riverside Retreat",
            location: destination || "New York",
            address: "555 River Road",
            starRating: 4,
            userRating: 4.6,
            reviewCount: 932,
            price: 229,
            pricePerNight: 229,
            totalPrice: 229 * (rooms || 1) * (calculateNights(checkIn, checkOut) || 1),
            thumbnail: "/placeholder.svg",
            amenities: ["Free Wi-Fi", "Pool", "Spa", "Restaurant", "Room Service", "Parking"],
            distanceFromCenter: "1.5 km",
          },
        ]

        setHotels(mockHotels)

        // Set max price for filter
        const maxPrice = Math.max(...mockHotels.map((hotel) => hotel.price))
        setFilters((prev) => ({ ...prev, priceRange: [0, maxPrice] }))
      } catch (err) {
        console.error("Error fetching hotels:", err)
        setError("Failed to fetch hotels. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [searchParams])

  const sortHotels = (hotels) => {
    switch (sortBy) {
      case "price-low":
        return [...hotels].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...hotels].sort((a, b) => b.price - a.price)
      case "rating":
        return [...hotels].sort((a, b) => b.userRating - a.userRating)
      case "distance":
        return [...hotels].sort((a, b) => {
          const distanceA = Number.parseFloat(a.distanceFromCenter)
          const distanceB = Number.parseFloat(b.distanceFromCenter)
          return distanceA - distanceB
        })
      case "recommended":
      default:
        return hotels
    }
  }

  const filterHotels = (hotels) => {
    return hotels.filter((hotel) => {
      // Filter by price range
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) {
        return false
      }

      // Filter by star rating (if any selected)
      if (filters.starRating.length > 0 && !filters.starRating.includes(hotel.starRating)) {
        return false
      }

      // Filter by amenities (if any selected)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) => hotel.amenities.includes(amenity))
        if (!hasAllAmenities) {
          return false
        }
      }

      return true
    })
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleStarRatingFilter = (rating) => {
    setFilters((prev) => {
      const starRating = prev.starRating.includes(rating)
        ? prev.starRating.filter((r) => r !== rating)
        : [...prev.starRating, rating]

      return { ...prev, starRating }
    })
  }

  const handleAmenityFilter = (amenity) => {
    setFilters((prev) => {
      const amenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity]

      return { ...prev, amenities }
    })
  }

  const handlePriceRangeChange = (min, max) => {
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }))
  }

  const displayedHotels = sortHotels(filterHotels(hotels))
  const allAmenities = [...new Set(hotels.flatMap((hotel) => hotel.amenities))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg
                className="animate-spin h-12 w-12 text-blue-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Searching for the best hotels</h2>
              <p className="text-gray-600">This may take a moment...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Link href="/" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-2xl font-bold">Air Scraper Travel</h1>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Hotels in {searchParams.get("destination") || "New York"}
              </h2>
              <p className="text-gray-600">
                {searchParams.get("checkIn")} to {searchParams.get("checkOut")}
                {" • "}
                {searchParams.get("rooms") || 1}{" "}
                {Number.parseInt(searchParams.get("rooms") || 1) === 1 ? "Room" : "Rooms"}
                {" • "}
                {searchParams.get("adults") || 1}{" "}
                {Number.parseInt(searchParams.get("adults") || 1) === 1 ? "Adult" : "Adults"}
                {searchParams.get("children") && Number.parseInt(searchParams.get("children")) > 0
                  ? `, ${searchParams.get("children")} Children`
                  : ""}
              </p>
            </div>
            <Link href="/" className="mt-4 md:mt-0 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Modify Search
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <div className="lg:w-1/4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4">Filters</h3>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Price Range</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(...hotels.map((hotel) => hotel.price))}
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Star Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.starRating.includes(rating)}
                          onChange={() => handleStarRatingFilter(rating)}
                          className="mr-2"
                        />
                        {rating} {rating === 1 ? "Star" : "Stars"}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Amenities</h4>
                  <div className="space-y-2">
                    {allAmenities.slice(0, 8).map((amenity, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={() => handleAmenityFilter(amenity)}
                          className="mr-2"
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">{displayedHotels.length} hotels found</p>
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price (lowest first)</option>
                    <option value="price-high">Price (highest first)</option>
                    <option value="rating">Guest Rating</option>
                    <option value="distance">Distance from Center</option>
                  </select>
                </div>
              </div>

              {displayedHotels.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold mb-2">No hotels found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                  <Link href="/" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    Start a new search
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedHotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-500">{hotel.name} Image</span>
                          </div>
                        </div>

                        <div className="p-4 md:w-2/3 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-lg">{hotel.name}</h3>
                              <div className="flex items-center mt-1">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ${index < hotel.starRating ? "text-yellow-400" : "text-gray-300"}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{hotel.address}</p>
                              <p className="text-gray-600 text-sm">{hotel.distanceFromCenter} from center</p>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center justify-end mb-1">
                                <div className="bg-gray-800 text-white font-bold rounded-lg px-2 py-1 text-sm mr-2">
                                  {hotel.userRating}
                                </div>
                                <div className="text-sm font-semibold">
                                  {hotel.userRating >= 4.5
                                    ? "Exceptional"
                                    : hotel.userRating >= 4
                                      ? "Excellent"
                                      : hotel.userRating >= 3.5
                                        ? "Very Good"
                                        : "Good"}
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">{hotel.reviewCount} reviews</div>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="flex flex-wrap gap-2">
                              {hotel.amenities.slice(0, 4).map((amenity, index) => (
                                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                  {amenity}
                                </span>
                              ))}
                              {hotel.amenities.length > 4 && (
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                  +{hotel.amenities.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-auto pt-4 flex justify-between items-end">
                            <div>
                              <div className="text-sm text-gray-600">
                                {calculateNights(searchParams.get("checkIn"), searchParams.get("checkOut"))} night
                                {calculateNights(searchParams.get("checkIn"), searchParams.get("checkOut")) > 1
                                  ? "s"
                                  : ""}
                                , {searchParams.get("rooms") || 1} room
                                {Number.parseInt(searchParams.get("rooms") || 1) > 1 ? "s" : ""}
                              </div>
                              <div className="text-sm text-gray-600">${hotel.pricePerNight} per night</div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800">${hotel.totalPrice}</div>
                              <div className="text-sm text-gray-600">includes taxes & fees</div>
                              <Link
                                href={`/hotels/details/${hotel.id}?destination=${searchParams.get("destination")}&checkIn=${searchParams.get("checkIn")}&checkOut=${searchParams.get("checkOut")}&rooms=${searchParams.get("rooms") || 1}&adults=${searchParams.get("adults") || 1}&children=${searchParams.get("children") || 0}`}
                                className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 mt-2"
                              >
                                View Deal
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black text-white py-10">
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
                  <a href="/about" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/about" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
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
