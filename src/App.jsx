"use client"

import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SearchForm from "./components/SearchForm"
import SearchResults from "./components/SearchResults"
import { searchAirports, searchFlights } from "./services/api"

function App() {
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departDate: "",
    returnDate: "",
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: "ECONOMY",
  })

  const [originSuggestions, setOriginSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleInputChange = (field, value) => {
    setSearchParams({
      ...searchParams,
      [field]: value,
    })
  }

  const handleAirportSearch = async (query, setResults) => {
    if (query.length < 2) {
      setResults([])
      return
    }

    try {
      setIsLoading(true)
      const data = await searchAirports(query)
      if (data && Array.isArray(data)) {
        setResults(data)
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

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const results = await searchFlights(searchParams)
      setSearchResults(results)
      setHasSearched(true)
    } catch (error) {
      console.error("Error searching flights:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {!hasSearched ? (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Find Your Perfect Flight</h2>

            <SearchForm
              searchParams={searchParams}
              handleInputChange={handleInputChange}
              handleAirportSearch={handleAirportSearch}
              handleSearch={handleSearch}
              originSuggestions={originSuggestions}
              setOriginSuggestions={setOriginSuggestions}
              destinationSuggestions={destinationSuggestions}
              setDestinationSuggestions={setDestinationSuggestions}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <SearchResults
            results={searchResults}
            searchParams={searchParams}
            isLoading={isLoading}
            onBackToSearch={() => setHasSearched(false)}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
