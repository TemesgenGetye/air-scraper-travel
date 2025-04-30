"use client"

export default function SearchForm({
  searchParams,
  handleInputChange,
  handleAirportSearch,
  handleSearch,
  originSuggestions,
  setOriginSuggestions,
  destinationSuggestions,
  setDestinationSuggestions,
  isLoading,
}) {
  return (
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.origin}
            onChange={(e) => {
              handleInputChange("origin", e.target.value)
              handleAirportSearch(e.target.value, setOriginSuggestions)
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
                      handleInputChange("origin", airport.name || airport.iata)
                      setOriginSuggestions([])
                    }}
                  >
                    {airport.name || airport.iata} {airport.iata ? `(${airport.iata})` : ""}{" "}
                    {airport.city ? `- ${airport.city}` : ""}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.destination}
            onChange={(e) => {
              handleInputChange("destination", e.target.value)
              handleAirportSearch(e.target.value, setDestinationSuggestions)
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
                      handleInputChange("destination", airport.name || airport.iata)
                      setDestinationSuggestions([])
                    }}
                  >
                    {airport.name || airport.iata} {airport.iata ? `(${airport.iata})` : ""}{" "}
                    {airport.city ? `- ${airport.city}` : ""}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.departDate}
            onChange={(e) => handleInputChange("departDate", e.target.value)}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.returnDate}
            onChange={(e) => handleInputChange("returnDate", e.target.value)}
            min={searchParams.departDate || new Date().toISOString().split("T")[0]}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.adults}
            onChange={(e) => handleInputChange("adults", Number.parseInt(e.target.value))}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.children}
            onChange={(e) => handleInputChange("children", Number.parseInt(e.target.value))}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.infants}
            onChange={(e) => handleInputChange("infants", Number.parseInt(e.target.value))}
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
            value={searchParams.cabinClass}
            onChange={(e) => handleInputChange("cabinClass", e.target.value)}
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
          disabled={isLoading}
          className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Searching..." : "Search Flights"}
        </button>
      </div>
    </form>
  )
}
