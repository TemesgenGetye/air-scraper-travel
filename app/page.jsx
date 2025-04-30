"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [activeTab, setActiveTab] = useState("flights")
  const [searchParams, setSearchParams] = useState({
    flights: {
      origin: "",
      destination: "",
      departDate: "",
      returnDate: "",
      adults: 1,
      children: 0,
      infants: 0,
      cabinClass: "ECONOMY",
    },
    hotels: {
      destination: "",
      checkIn: "",
      checkOut: "",
      rooms: 1,
      adults: 1,
      children: 0,
    },
    cars: {
      pickupLocation: "",
      pickupDate: "",
      pickupTime: "10:00",
      dropoffDate: "",
      dropoffTime: "10:00",
      driverAge: 30,
    },
  })

  const [originSuggestions, setOriginSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [hotelSuggestions, setHotelSuggestions] = useState([])
  const [carLocationSuggestions, setCarLocationSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleInputChange = (category, field, value) => {
    setSearchParams({
      ...searchParams,
      [category]: {
        ...searchParams[category],
        [field]: value,
      },
    })
  }

  const searchAirports = async (query, setResults) => {
    if (query.length < 2) {
      setResults([])
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/airports?query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.status && data.data) {
        setResults(data.data)
      } else {
        setResults([])
      }
    } catch (error) {
      console.error("Error searching airports:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const searchHotels = async (query) => {
    if (query.length < 2) {
      setHotelSuggestions([])
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/hotel-locations?query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.status && data.data) {
        setHotelSuggestions(data.data)
      } else {
        setHotelSuggestions([])
      }
    } catch (error) {
      console.error("Error searching hotels:", error)
      setHotelSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const searchCarLocations = async (query) => {
    if (query.length < 2) {
      setCarLocationSuggestions([])
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/car-locations?query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.status && data.data) {
        setCarLocationSuggestions(data.data)
      } else {
        setCarLocationSuggestions([])
      }
    } catch (error) {
      console.error("Error searching car locations:", error)
      setCarLocationSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()

    if (activeTab === "flights") {
      router.push(
        `/flights/search?origin=${searchParams.flights.origin}&destination=${searchParams.flights.destination}&departDate=${searchParams.flights.departDate}&returnDate=${searchParams.flights.returnDate}&adults=${searchParams.flights.adults}&children=${searchParams.flights.children}&infants=${searchParams.flights.infants}&cabinClass=${searchParams.flights.cabinClass}`,
      )
    } else if (activeTab === "hotels") {
      router.push(
        `/hotels/search?destination=${searchParams.hotels.destination}&checkIn=${searchParams.hotels.checkIn}&checkOut=${searchParams.hotels.checkOut}&rooms=${searchParams.hotels.rooms}&adults=${searchParams.hotels.adults}&children=${searchParams.hotels.children}`,
      )
    } else if (activeTab === "cars") {
      router.push(
        `/cars/search?pickupLocation=${searchParams.cars.pickupLocation}&pickupDate=${searchParams.cars.pickupDate}&pickupTime=${searchParams.cars.pickupTime}&dropoffDate=${searchParams.cars.dropoffDate}&dropoffTime=${searchParams.cars.dropoffTime}&driverAge=${searchParams.cars.driverAge}`,
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <h1 className="text-2xl font-bold">Air Scraper Travel</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="/about" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    My Trips
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:underline">
                    Support
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Find Your Perfect Trip</h2>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === "flights" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabChange("flights")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11.43a1 1 0 00-.725-.962l-5-1.429a1 1 0 01.725-1.962l5 1.429a1 1 0 00.725-.038l5-1.429a1 1 0 011.444.962l-7 14z" />
              </svg>
              Flights
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === "hotels" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabChange("hotels")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              Hotels
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${activeTab === "cars" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => handleTabChange("cars")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 001-1v-3a1 1 0 00-.293-.707l-2-2A1 1 0 0012 7H9.414a1 1 0 00-.707.293L7 9H4a1 1 0 00-1 1v1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3a1 1 0 001-1v-1a1 1 0 00-1-1h-1.59l-1.7-1.7A1 1 0 0010 5H7a1 1 0 00-.707.293L4.586 7H3a1 1 0 00-1 1v1.05A2.5 2.5 0 013 11.95V4z" />
              </svg>
              Car Hire
            </button>
          </div>

          {/* Flight Search Form */}
          {activeTab === "flights" && (
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    id="origin"
                    placeholder="City or Airport"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.origin}
                    onChange={(e) => {
                      handleInputChange("flights", "origin", e.target.value)
                      searchAirports(e.target.value, setOriginSuggestions)
                    }}
                  />
                  {originSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full max-w-md mt-1 bg-white shadow-lg rounded-md border border-gray-200">
                      <ul className="py-1">
                        {originSuggestions.map((airport, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleInputChange("flights", "origin", airport.presentation.suggestionTitle)
                              setOriginSuggestions([])
                            }}
                          >
                            {airport.presentation.suggestionTitle} - {airport.presentation.subtitle}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    id="destination"
                    placeholder="City or Airport"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.destination}
                    onChange={(e) => {
                      handleInputChange("flights", "destination", e.target.value)
                      searchAirports(e.target.value, setDestinationSuggestions)
                    }}
                  />
                  {destinationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full max-w-md mt-1 bg-white shadow-lg rounded-md border border-gray-200">
                      <ul className="py-1">
                        {destinationSuggestions.map((airport, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              handleInputChange("flights", "destination", airport.presentation.suggestionTitle)
                              setDestinationSuggestions([])
                            }}
                          >
                            {airport.presentation.suggestionTitle} - {airport.presentation.subtitle}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="departDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Depart
                  </label>
                  <input
                    type="date"
                    id="departDate"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.departDate}
                    onChange={(e) => handleInputChange("flights", "departDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Return
                  </label>
                  <input
                    type="date"
                    id="returnDate"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.returnDate}
                    onChange={(e) => handleInputChange("flights", "returnDate", e.target.value)}
                    min={searchParams.flights.departDate || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
                    Adults
                  </label>
                  <select
                    id="adults"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.adults}
                    onChange={(e) => handleInputChange("flights", "adults", Number.parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                    Children
                  </label>
                  <select
                    id="children"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.children}
                    onChange={(e) => handleInputChange("flights", "children", Number.parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="infants" className="block text-sm font-medium text-gray-700 mb-1">
                    Infants
                  </label>
                  <select
                    id="infants"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.infants}
                    onChange={(e) => handleInputChange("flights", "infants", Number.parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="cabinClass" className="block text-sm font-medium text-gray-700 mb-1">
                    Cabin Class
                  </label>
                  <select
                    id="cabinClass"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.flights.cabinClass}
                    onChange={(e) => handleInputChange("flights", "cabinClass", e.target.value)}
                  >
                    <option value="ECONOMY">Economy</option>
                    <option value="PREMIUM_ECONOMY">Premium Economy</option>
                    <option value="BUSINESS">Business</option>
                    <option value="FIRST">First Class</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Search Flights
                </button>
              </div>
            </form>
          )}

          {/* Hotel Search Form */}
          {activeTab === "hotels" && (
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="hotelDestination" className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <input
                  type="text"
                  id="hotelDestination"
                  placeholder="City, Hotel, or Landmark"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchParams.hotels.destination}
                  onChange={(e) => {
                    handleInputChange("hotels", "destination", e.target.value)
                    searchHotels(e.target.value)
                  }}
                />
                {hotelSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full max-w-md mt-1 bg-white shadow-lg rounded-md border border-gray-200">
                    <ul className="py-1">
                      {hotelSuggestions.map((hotel, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleInputChange("hotels", "destination", hotel.name)
                            setHotelSuggestions([])
                          }}
                        >
                          {hotel.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.hotels.checkIn}
                    onChange={(e) => handleInputChange("hotels", "checkIn", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.hotels.checkOut}
                    onChange={(e) => handleInputChange("hotels", "checkOut", e.target.value)}
                    min={searchParams.hotels.checkIn || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="rooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Rooms
                  </label>
                  <select
                    id="rooms"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.hotels.rooms}
                    onChange={(e) => handleInputChange("hotels", "rooms", Number.parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="hotelAdults" className="block text-sm font-medium text-gray-700 mb-1">
                    Adults
                  </label>
                  <select
                    id="hotelAdults"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.hotels.adults}
                    onChange={(e) => handleInputChange("hotels", "adults", Number.parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="hotelChildren" className="block text-sm font-medium text-gray-700 mb-1">
                    Children
                  </label>
                  <select
                    id="hotelChildren"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.hotels.children}
                    onChange={(e) => handleInputChange("hotels", "children", Number.parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Search Hotels
                </button>
              </div>
            </form>
          )}

          {/* Car Hire Search Form */}
          {activeTab === "cars" && (
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
                  Pick-up Location
                </label>
                <input
                  type="text"
                  id="pickupLocation"
                  placeholder="City or Airport"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchParams.cars.pickupLocation}
                  onChange={(e) => {
                    handleInputChange("cars", "pickupLocation", e.target.value)
                    searchCarLocations(e.target.value)
                  }}
                />
                {carLocationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full max-w-md mt-1 bg-white shadow-lg rounded-md border border-gray-200">
                    <ul className="py-1">
                      {carLocationSuggestions.map((location, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleInputChange("cars", "pickupLocation", location.name)
                            setCarLocationSuggestions([])
                          }}
                        >
                          {location.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Pick-up Date
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.cars.pickupDate}
                    onChange={(e) => handleInputChange("cars", "pickupDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Pick-up Time
                  </label>
                  <select
                    id="pickupTime"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.cars.pickupTime}
                    onChange={(e) => handleInputChange("cars", "pickupTime", e.target.value)}
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return [
                        <option key={`${hour}:00`} value={`${hour}:00`}>{`${hour}:00`}</option>,
                        <option key={`${hour}:30`} value={`${hour}:30`}>{`${hour}:30`}</option>,
                      ]
                    }).flat()}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dropoffDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Drop-off Date
                  </label>
                  <input
                    type="date"
                    id="dropoffDate"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.cars.dropoffDate}
                    onChange={(e) => handleInputChange("cars", "dropoffDate", e.target.value)}
                    min={searchParams.cars.pickupDate || new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label htmlFor="dropoffTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Drop-off Time
                  </label>
                  <select
                    id="dropoffTime"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={searchParams.cars.dropoffTime}
                    onChange={(e) => handleInputChange("cars", "dropoffTime", e.target.value)}
                  >
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return [
                        <option key={`${hour}:00`} value={`${hour}:00`}>{`${hour}:00`}</option>,
                        <option key={`${hour}:30`} value={`${hour}:30`}>{`${hour}:30`}</option>,
                      ]
                    }).flat()}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="driverAge" className="block text-sm font-medium text-gray-700 mb-1">
                  Driver's Age
                </label>
                <select
                  id="driverAge"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchParams.cars.driverAge}
                  onChange={(e) => handleInputChange("cars", "driverAge", Number.parseInt(e.target.value))}
                >
                  {Array.from({ length: 53 }, (_, i) => i + 18).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Search Cars
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Featured Destinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["New York", "London", "Tokyo", "Paris"].map((city, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">{city} Image</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{city}</h3>
                  <p className="text-gray-600 text-sm mb-3">Explore the vibrant culture and iconic landmarks</p>
                  <a href="/about" className="text-gray-800 text-sm font-medium hover:underline">
                    View Flights
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-gray-700 to-black rounded-lg shadow-md p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Summer Sale</h3>
              <p className="mb-4">Get up to 30% off on selected flights and hotels. Limited time offer!</p>
              <a
                href="/about"
                className="inline-block px-4 py-2 bg-white text-gray-800 rounded-md font-medium hover:bg-gray-100"
              >
                View Deals
              </a>
            </div>
            <div className="bg-gradient-to-r from-gray-600 to-gray-900 rounded-lg shadow-md p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Weekend Getaways</h3>
              <p className="mb-4">
                Discover perfect weekend escapes with our curated selection of nearby destinations.
              </p>
              <a
                href="/about"
                className="inline-block px-4 py-2 bg-white text-gray-800 rounded-md font-medium hover:bg-gray-100"
              >
                Explore Now
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
