"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function CarSearchResults() {
  const searchParams = useSearchParams()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState("recommended")
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    carType: [],
    transmission: [],
    features: [],
  })

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true)

        const pickupLocation = searchParams.get("pickupLocation")
        const pickupDate = searchParams.get("pickupDate")
        const pickupTime = searchParams.get("pickupTime")
        const dropoffDate = searchParams.get("dropoffDate")
        const dropoffTime = searchParams.get("dropoffTime")
        const driverAge = searchParams.get("driverAge") || 30

        // In a real application, you would call the API with these parameters
        // For this example, we'll use mock data

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock car data
        const mockCars = [
          {
            id: "1",
            name: "Toyota Corolla",
            type: "Economy",
            image: "/placeholder.svg",
            seats: 5,
            doors: 4,
            bags: 2,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 45,
            totalPrice: 45 * calculateDays(pickupDate, dropoffDate),
            features: ["Air Conditioning", "Bluetooth", "USB Port"],
            supplier: "Hertz",
            location: pickupLocation || "New York Airport",
            rating: 4.5,
            reviewCount: 234,
          },
          {
            id: "2",
            name: "Ford Focus",
            type: "Compact",
            image: "/placeholder.svg",
            seats: 5,
            doors: 4,
            bags: 2,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 48,
            totalPrice: 48 * calculateDays(pickupDate, dropoffDate),
            features: ["Air Conditioning", "Bluetooth", "USB Port", "GPS"],
            supplier: "Avis",
            location: pickupLocation || "New York Airport",
            rating: 4.3,
            reviewCount: 187,
          },
          {
            id: "3",
            name: "Honda Civic",
            type: "Economy",
            image: "/placeholder.svg",
            seats: 5,
            doors: 4,
            bags: 2,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 47,
            totalPrice: 47 * calculateDays(pickupDate, dropoffDate),
            features: ["Air Conditioning", "Bluetooth", "USB Port"],
            supplier: "Enterprise",
            location: pickupLocation || "New York Airport",
            rating: 4.4,
            reviewCount: 210,
          },
          {
            id: "4",
            name: "Chevrolet Malibu",
            type: "Intermediate",
            image: "/placeholder.svg",
            seats: 5,
            doors: 4,
            bags: 3,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 55,
            totalPrice: 55 * calculateDays(pickupDate, dropoffDate),
            features: ["Air Conditioning", "Bluetooth", "USB Port", "GPS", "Cruise Control"],
            supplier: "Budget",
            location: pickupLocation || "New York Airport",
            rating: 4.2,
            reviewCount: 156,
          },
          {
            id: "5",
            name: "Toyota Camry",
            type: "Standard",
            image: "/placeholder.svg",
            seats: 5,
            doors: 4,
            bags: 3,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 60,
            totalPrice: 60 * calculateDays(pickupDate, dropoffDate),
            features: ["Air Conditioning", "Bluetooth", "USB Port", "GPS", "Cruise Control", "Leather Seats"],
            supplier: "Hertz",
            location: pickupLocation || "New York Airport",
            rating: 4.6,
            reviewCount: 278,
          },
          {
            id: "6",
            name: "Ford Mustang",
            type: "Convertible",
            image: "/placeholder.svg",
            seats: 4,
            doors: 2,
            bags: 2,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 85,
            totalPrice: 85 * calculateDays(pickupDate, dropoffDate),
            features: [
              "Air Conditioning",
              "Bluetooth",
              "USB Port",
              "GPS",
              "Cruise Control",
              "Leather Seats",
              "Convertible",
            ],
            supplier: "Avis",
            location: pickupLocation || "New York Airport",
            rating: 4.7,
            reviewCount: 312,
          },
          {
            id: "7",
            name: "Jeep Wrangler",
            type: "SUV",
            image: "/placeholder.svg",
            seats: 5,
            doors: 4,
            bags: 3,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 75,
            totalPrice: 75 * calculateDays(pickupDate, dropoffDate),
            features: ["Air Conditioning", "Bluetooth", "USB Port", "GPS", "Cruise Control", "4x4"],
            supplier: "Enterprise",
            location: pickupLocation || "New York Airport",
            rating: 4.5,
            reviewCount: 245,
          },
          {
            id: "8",
            name: "Chevrolet Suburban",
            type: "Large SUV",
            image: "/placeholder.svg",
            seats: 7,
            doors: 5,
            bags: 4,
            transmission: "Automatic",
            airConditioning: true,
            mileage: "Unlimited",
            fuelPolicy: "Full to Full",
            price: 95,
            totalPrice: 95 * calculateDays(pickupDate, dropoffDate),
            features: [
              "Air Conditioning",
              "Bluetooth",
              "USB Port",
              "GPS",
              "Cruise Control",
              "Leather Seats",
              "3rd Row Seating",
            ],
            supplier: "Budget",
            location: pickupLocation || "New York Airport",
            rating: 4.4,
            reviewCount: 198,
          },
        ]

        setCars(mockCars)

        // Set max price for filter
        const maxPrice = Math.max(...mockCars.map((car) => car.price))
        setFilters((prev) => ({ ...prev, priceRange: [0, maxPrice] }))
      } catch (err) {
        console.error("Error fetching cars:", err)
        setError("Failed to fetch cars. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [searchParams])

  // Helper function to calculate days between two dates
  function calculateDays(pickupDate, dropoffDate) {
    if (!pickupDate || !dropoffDate) return 1

    const pickup = new Date(pickupDate)
    const dropoff = new Date(dropoffDate)

    const diffTime = Math.abs(dropoff - pickup)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays || 1
  }

  const sortCars = (cars) => {
    switch (sortBy) {
      case "price-low":
        return [...cars].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...cars].sort((a, b) => b.price - a.price)
      case "rating":
        return [...cars].sort((a, b) => b.rating - a.rating)
      case "size":
        return [...cars].sort((a, b) => {
          const sizeOrder = {
            Economy: 1,
            Compact: 2,
            Intermediate: 3,
            Standard: 4,
            SUV: 5,
            "Large SUV": 6,
            Convertible: 7,
          }
          return sizeOrder[a.type] - sizeOrder[b.type]
        })
      case "recommended":
      default:
        return cars
    }
  }

  const filterCars = (cars) => {
    return cars.filter((car) => {
      // Filter by price range
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) {
        return false
      }

      // Filter by car type (if any selected)
      if (filters.carType.length > 0 && !filters.carType.includes(car.type)) {
        return false
      }

      // Filter by transmission (if any selected)
      if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) {
        return false
      }

      // Filter by features (if any selected)
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((feature) => car.features.includes(feature))
        if (!hasAllFeatures) {
          return false
        }
      }

      return true
    })
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  const handleCarTypeFilter = (type) => {
    setFilters((prev) => {
      const carType = prev.carType.includes(type) ? prev.carType.filter((t) => t !== type) : [...prev.carType, type]

      return { ...prev, carType }
    })
  }

  const handleTransmissionFilter = (transmission) => {
    setFilters((prev) => {
      const transmissions = prev.transmission.includes(transmission)
        ? prev.transmission.filter((t) => t !== transmission)
        : [...prev.transmission, transmission]

      return { ...prev, transmission: transmissions }
    })
  }

  const handleFeatureFilter = (feature) => {
    setFilters((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature]

      return { ...prev, features }
    })
  }

  const handlePriceRangeChange = (min, max) => {
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }))
  }

  const displayedCars = sortCars(filterCars(cars))
  const carTypes = [...new Set(cars.map((car) => car.type))]
  const transmissionTypes = [...new Set(cars.map((car) => car.transmission))]
  const allFeatures = [...new Set(cars.flatMap((car) => car.features))]

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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Searching for the best car rentals</h2>
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
                Car Rentals in {searchParams.get("pickupLocation") || "New York"}
              </h2>
              <p className="text-gray-600">
                {searchParams.get("pickupDate")} {searchParams.get("pickupTime")} to {searchParams.get("dropoffDate")}{" "}
                {searchParams.get("dropoffTime")}
                {" • "}
                Driver Age: {searchParams.get("driverAge") || "30"}
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
                  <h4 className="font-semibold mb-2">Price Range (per day)</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(...cars.map((car) => car.price))}
                    value={filters.priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(filters.priceRange[0], Number.parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Car Type</h4>
                  <div className="space-y-2">
                    {carTypes.map((type, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.carType.includes(type)}
                          onChange={() => handleCarTypeFilter(type)}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Transmission</h4>
                  <div className="space-y-2">
                    {transmissionTypes.map((transmission, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.transmission.includes(transmission)}
                          onChange={() => handleTransmissionFilter(transmission)}
                          className="mr-2"
                        />
                        {transmission}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Features</h4>
                  <div className="space-y-2">
                    {allFeatures.slice(0, 8).map((feature, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.features.includes(feature)}
                          onChange={() => handleFeatureFilter(feature)}
                          className="mr-2"
                        />
                        {feature}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-gray-600">{displayedCars.length} cars found</p>
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
                    <option value="rating">Rating</option>
                    <option value="size">Car Size</option>
                  </select>
                </div>
              </div>

              {displayedCars.length === 0 ? (
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
                  <h3 className="text-xl font-bold mb-2">No cars found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                  <Link href="/" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    Start a new search
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayedCars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-500">{car.name} Image</span>
                          </div>
                        </div>

                        <div className="p-4 md:w-2/3 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-lg">{car.name}</h3>
                              <div className="text-sm text-gray-600">{car.type} or similar</div>
                              <div className="flex items-center mt-1">
                                <div className="bg-gray-800 text-white font-bold rounded-lg px-2 py-1 text-xs mr-2">
                                  {car.rating}
                                </div>
                                <div className="text-xs text-gray-600">{car.reviewCount} reviews</div>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm font-semibold">{car.supplier}</div>
                              <div className="text-sm text-gray-600">{car.location}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                            <div className="flex flex-col items-center text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                              </svg>
                              <span className="text-sm text-gray-600">{car.seats} Seats</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                />
                              </svg>
                              <span className="text-sm text-gray-600">{car.bags} Bags</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                                />
                              </svg>
                              <span className="text-sm text-gray-600">{car.transmission}</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                              <span className="text-sm text-gray-600">{car.mileage}</span>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                              {car.features.slice(0, 4).map((feature, index) => (
                                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                              {car.features.length > 4 && (
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                  +{car.features.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-auto pt-4 flex justify-between items-end">
                            <div>
                              <div className="text-sm text-gray-600">
                                {calculateDays(searchParams.get("pickupDate"), searchParams.get("dropoffDate"))} day
                                {calculateDays(searchParams.get("pickupDate"), searchParams.get("dropoffDate")) > 1
                                  ? "s"
                                  : ""}
                              </div>
                              <div className="text-sm text-gray-600">${car.price} per day</div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-800">${car.totalPrice}</div>
                              <div className="text-sm text-gray-600">includes taxes & fees</div>
                              <Link
                                href={`/cars/details/${car.id}?pickupLocation=${searchParams.get("pickupLocation")}&pickupDate=${searchParams.get("pickupDate")}&pickupTime=${searchParams.get("pickupTime")}&dropoffDate=${searchParams.get("dropoffDate")}&dropoffTime=${searchParams.get("dropoffTime")}&driverAge=${searchParams.get("driverAge") || "30"}`}
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
