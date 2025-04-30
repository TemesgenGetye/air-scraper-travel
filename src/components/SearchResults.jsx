"use client"

export default function SearchResults({ results, searchParams, isLoading, onBackToSearch }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="animate-spin h-12 w-12 text-gray-600 mb-4"
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
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {searchParams.origin} to {searchParams.destination}
          </h2>
          <p className="text-gray-600">
            {searchParams.departDate}
            {searchParams.returnDate ? ` - ${searchParams.returnDate}` : ""}
            {" • "}
            {searchParams.adults} Adult
            {searchParams.adults > 1 ? "s" : ""}
            {searchParams.children > 0 ? `, ${searchParams.children} Children` : ""}
            {searchParams.infants > 0 ? `, ${searchParams.infants} Infants` : ""}
            {" • "}
            {searchParams.cabinClass.replace("_", " ").toLowerCase()}
          </p>
        </div>
        <button
          onClick={onBackToSearch}
          className="mt-4 md:mt-0 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Modify Search
        </button>
      </div>

      <div className="space-y-4">
        {results.length === 0 ? (
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
            <p className="text-gray-600 mb-4">Try adjusting your search criteria.</p>
            <button onClick={onBackToSearch} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Start a new search
            </button>
          </div>
        ) : (
          results.map((flight) => (
            <div key={flight.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <span className="font-semibold">{flight.airline}</span>
                  </div>
                  <div className="text-sm text-gray-600">Flight {flight.flightNumber}</div>
                  <div className="text-sm text-gray-600">{flight.cabinClass.replace("_", " ").toLowerCase()}</div>
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
                    {flight.stops > 0 && flight.stopAirports && (
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
                  <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 mt-2">Select</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
