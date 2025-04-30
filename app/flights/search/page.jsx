"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function FlightSearchResults() {
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("price")
  const [filters, setFilters] = useState({
    airlines: [],
    maxPrice: null,
    stops: "any",
  })

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true)

        const origin = searchParams.get("origin")
        const destination = searchParams.get("destination")
        const departDate = searchParams.get("departDate")
        const returnDate = searchParams.get("returnDate")
        const adults = searchParams.get("adults") || 1
        const children = searchParams.get("children") || 0
        const infants = searchParams.get("infants") || 0
        const cabinClass = searchParams.get("cabinClass") || "ECONOMY"

        // Extract SkyId and EntityId from origin and destination
        const originParts = origin ? origin.match(/$$([^)]+)$$/) : null
        const destinationParts = destination ? destination.match(/$$([^)]+)$$/) : null

        const originSkyId = originParts ? originParts[1] : ""
        const destinationSkyId = destinationParts ? destinationParts[1] : ""

        // For simplicity, we're using mock data here
        // In a real application, you would call the API with the extracted parameters

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock flight data
        const mockFlights = [
          {
            id: "1",
            airline: "Delta Airlines",
            flightNumber: "DL1234",
            departureAirport: originSkyId,
            arrivalAirport: destinationSkyId,
            departureTime: "08:30",
            arrivalTime: "11:45",
            duration: "3h 15m",
            stops: 0,
            price: 299,
            cabinClass: cabinClass,
          },
          {
            id: "2",
            airline: "American Airlines",
            flightNumber: "AA5678",
            departureAirport: originSkyId,
            arrivalAirport: destinationSkyId,
            departureTime: "10:15",
            arrivalTime: "14:30",
            duration: "4h 15m",
            stops: 1,
            stopAirports: ["ATL"],
            price: 249,
            cabinClass: cabinClass,
          },
          {
            id: "3",
            airline: "United Airlines",
            flightNumber: "UA9012",
            departureAirport: originSkyId,
            arrivalAirport: destinationSkyId,
            departureTime: "12:45",
            arrivalTime: "16:20",
            duration: "3h 35m",
            stops: 0,
            price: 329,
            cabinClass: cabinClass,
          },
          {
            id: "4",
            airline: "Southwest Airlines",
            flightNumber: "WN3456",
            departureAirport: originSkyId,
            arrivalAirport: destinationSkyId,
            departureTime: "14:30",
            arrivalTime: "19:15",
            duration: "4h 45m",
            stops: 1,
            stopAirports: ["DEN"],
            price: 199,
            cabinClass: cabinClass,
          },
          {
            id: "5",
            airline: "JetBlue",
            flightNumber: "B6789",
            departureAirport: originSkyId,
            arrivalAirport: destinationSkyId,
            departureTime: "16:20",
            arrivalTime: "20:05",
            duration: "3h 45m",
            stops: 0,
            price: 279,
            cabinClass: cabinClass,
          },
        ]

        setFlights(mockFlights)

        // Set max price for filter
        const maxPrice = Math.max(...mockFlights.map((flight) => flight.price))
        setFilters((prev) => ({ ...prev, maxPrice }))
      } catch (err) {
        console.error("Error fetching flights:", err)
        setError("Failed to fetch flights. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [searchParams])

  const sortFlights = (flights) => {
    switch (sortBy) {
      case "price":
        return [...flights].sort((a, b) => a.price - b.price)
      case "duration":
        return [...flights].sort((a, b) => {
          const durationA =
            Number.parseInt(a.duration.split("h")[0]) * 60 +
            Number.parseInt(a.duration.split("h")[1].replace("m", "").trim())
          const durationB =
            Number.parseInt(b.duration.split("h")[0]) * 60 +
            Number.parseInt(b.duration.split("h")[1].replace("m", "").trim())
          return durationA - durationB
        })
      case "departure":
        return [...flights].sort((a, b) => {
          const timeA = Number.parseInt(a.departureTime.replace(":", ""))
          const timeB = Number.parseInt(b.departureTime.replace(":", ""))
          return timeA - timeB
        })
      case "arrival":
        return [...flights].sort((a, b) => {
          const timeA = Number.parseInt(a.arrivalTime.replace(":", ""))
          const timeB = Number.parseInt(b.arrivalTime.replace(":", ""))
          return timeA - timeB
        })
      default:
        return flights
    }
  }

  const filterFlights = (flights) => {
    return flights.filter((flight) => {
      // Filter by stops
      if (filters.stops === "nonstop" && flight.stops > 0) {
        return false
      }
      if (filters.stops === "1stop" && flight.stops !== 1) {
        return false
      }

      // Filter by airlines (if any selected)
      if (filters.airlines.length > 0 && !filters.airlines.includes(flight.airline)) {
        return false
      }

      return true
    })
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleAirlineFilter = (airline) => {
    setFilters((prev) => {
      const airlines = prev.airlines.includes(airline)
        ? prev.airlines.filter((a) => a !== airline)
        : [...prev.airlines, airline]

      return { ...prev, airlines }
    })
  }

  const handleStopsFilter = (stops) => {
    setFilters((prev) => ({ ...prev, stops }))
  }

  const displayedFlights = sortFlights(filterFlights(flights))
  const uniqueAirlines = [...new Set(flights.map((flight) => flight.airline))]

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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Searching for the best flights</h2>
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
                {searchParams.get("origin")} to {searchParams.get("destination")}
              </h2>
              <p className="text-gray-600">
                {searchParams.get("departDate")}
                {searchParams.get("returnDate") ? ` - ${searchParams.get("returnDate")}` : ""}
                {" • "}
                {searchParams.get("adults") || 1} Adult
                {searchParams.get("children") && Number.parseInt(searchParams.get("children")) > 0
                  ? `, ${searchParams.get("children")} Children`
                  : ""}
                {searchParams.get("infants") && Number.parseInt(searchParams.get("infants")) > 0
                  ? `, ${searchParams.get("infants")} Infants`
                  : ""}
                {" • "}
                {searchParams.get("cabinClass")
                  ? searchParams.get("cabinClass").replace("_", " ").toLowerCase()
                  : "economy"}
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
                  <h4 className="font-semibold mb-2">Stops</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stops"
                        checked={filters.stops === "any"}
                        onChange={() => handleStopsFilter("any")}
                        className="mr-2"
                      />
                      Any
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stops"
                        checked={filters.stops === "nonstop"}
                        onChange={() => handleStopsFilter("nonstop")}
                        className="mr-2"
                      />
                      Nonstop only
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stops"
                        checked={filters.stops === "1stop"}
                        onChange={() => handleStopsFilter("1stop")}
                        className="mr-2"
                      />
                      1 stop
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Airlines</h4>
                  <div className="space-y-2">
                    {uniqueAirlines.map((airline) => (
                      <label key={airline} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.airlines.includes(airline)}
                          onChange={() => handleAirlineFilter(airline)}
                          className="mr-2"
                        />
                        {airline}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">{displayedFlights.length} flights found</p>
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
                    <option value="price">Price (lowest first)</option>
                    <option value="duration">Duration (shortest first)</option>
                    <option value="departure">Departure (earliest first)</option>
                    <option value="arrival">Arrival (earliest first)</option>
                  </select>
                </div>
              </div>

              {displayedFlights.length === 0 ? (
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
                  <h3 className="text-xl font-bold mb-2">No flights found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                  <Link href="/" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    Start a new search
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedFlights.map((flight) => (
                    <div
                      key={flight.id}
                      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                            <span className="font-semibold">{flight.airline}</span>
                          </div>
                          <div className="text-sm text-gray-600">Flight {flight.flightNumber}</div>
                          <div className="text-sm text-gray-600">
                            {flight.cabinClass.replace("_", " ").toLowerCase()}
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.departureTime}</div>
                            <div className="text-sm text-gray-600">{flight.departureAirport}</div>
                          </div>

                          <div className="flex flex-col items-center">
                            <div className="text-xs text-gray-500">{flight.duration}</div>
                            <div className="relative w-24 md:w-32">
                              <div className="border-t border-gray-300 absolute w-full top-1/2"></div>
                              {flight.stops > 0 ? (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                                  {flight.stops} stop
                                </div>
                              ) : (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                                  Nonstop
                                </div>
                              )}
                            </div>
                            {flight.stops > 0 && (
                              <div className="text-xs text-gray-500 mt-1">{flight.stopAirports.join(", ")}</div>
                            )}
                          </div>

                          <div className="text-center">
                            <div className="text-lg font-bold">{flight.arrivalTime}</div>
                            <div className="text-sm text-gray-600">{flight.arrivalAirport}</div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                          <div className="text-2xl font-bold text-gray-800">${flight.price}</div>
                          <Link
                            href={`/flights/details/${flight.id}?origin=${searchParams.get("origin")}&destination=${searchParams.get("destination")}&departDate=${searchParams.get("departDate")}&returnDate=${searchParams.get("returnDate") || ""}`}
                            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 mt-2"
                          >
                            Select
                          </Link>
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
