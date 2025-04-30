"use client";

import { useState, useEffect } from "react";
import { searchAirports, searchFlights } from "../services/api";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Loader2, Plane } from "lucide-react";

export default function Home() {
  // State for form inputs
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [date, setDate] = useState(new Date());

  // State for airport suggestions
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  // State for selected airports
  const [selectedFromAirport, setSelectedFromAirport] = useState(null);
  const [selectedToAirport, setSelectedToAirport] = useState(null);

  // State for loading and results
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [isLoadingTo, setIsLoadingTo] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [flightResults, setFlightResults] = useState([]);
  const [error, setError] = useState(null);

  // Handle from airport search
  useEffect(() => {
    const fetchFromAirports = async () => {
      if (fromQuery.length < 2) {
        setFromSuggestions([]);
        return;
      }

      setIsLoadingFrom(true);
      try {
        const data = await searchAirports(fromQuery);
        setFromSuggestions(data || []);
      } catch (err) {
        console.error("Error fetching from airports:", err);
        setError("Failed to fetch airports. Please try again.");
      } finally {
        setIsLoadingFrom(false);
      }
    };

    const timeoutId = setTimeout(fetchFromAirports, 500);
    return () => clearTimeout(timeoutId);
  }, [fromQuery]);

  // Handle to airport search
  useEffect(() => {
    const fetchToAirports = async () => {
      if (toQuery.length < 2) {
        setToSuggestions([]);
        return;
      }

      setIsLoadingTo(true);
      try {
        const data = await searchAirports(toQuery);
        setToSuggestions(data || []);
      } catch (err) {
        console.error("Error fetching to airports:", err);
        setError("Failed to fetch airports. Please try again.");
      } finally {
        setIsLoadingTo(false);
      }
    };

    const timeoutId = setTimeout(fetchToAirports, 500);
    return () => clearTimeout(timeoutId);
  }, [toQuery]);

  // Handle flight search
  const handleSearch = async () => {
    if (!selectedFromAirport || !selectedToAirport) {
      setError("Please select both departure and arrival airports.");
      return;
    }

    setIsSearching(true);
    setError(null);
    setFlightResults([]);

    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const results = await searchFlights(
        selectedFromAirport.skyId,
        selectedToAirport.skyId,
        formattedDate
      );

      setFlightResults(results || []);

      if (results && results.length === 0) {
        setError("No flights found for the selected route and date.");
      }
    } catch (err) {
      console.error("Error searching flights:", err);
      setError("Failed to search flights. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle airport selection
  const handleSelectFromAirport = (airport) => {
    setSelectedFromAirport(airport);
    setFromQuery(airport.name);
    setFromSuggestions([]);
  };

  const handleSelectToAirport = (airport) => {
    setSelectedToAirport(airport);
    setToQuery(airport.name);
    setToSuggestions([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Sky Scrapper Flight Search
      </h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* From Airport */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">From</label>
              <Input
                type="text"
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
                placeholder="Search departure airport"
                className="w-full"
              />
              {isLoadingFrom && (
                <div className="absolute right-3 top-9">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {fromSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {fromSuggestions.map((airport) => (
                    <div
                      key={airport.skyId}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectFromAirport(airport)}
                    >
                      <div className="font-medium">{airport.name}</div>
                      <div className="text-sm text-gray-500">
                        {airport.cityName}, {airport.countryName}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* To Airport */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">To</label>
              <Input
                type="text"
                value={toQuery}
                onChange={(e) => setToQuery(e.target.value)}
                placeholder="Search arrival airport"
                className="w-full"
              />
              {isLoadingTo && (
                <div className="absolute right-3 top-9">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {toSuggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {toSuggestions.map((airport) => (
                    <div
                      key={airport.skyId}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectToAirport(airport)}
                    >
                      <div className="font-medium">{airport.name}</div>
                      <div className="text-sm text-gray-500">
                        {airport.cityName}, {airport.countryName}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button
            className="mt-4 w-full"
            onClick={handleSearch}
            disabled={isSearching || !selectedFromAirport || !selectedToAirport}
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Plane className="mr-2 h-4 w-4" />
                Search Flights
              </>
            )}
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Flight Results */}
      {flightResults.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Flight Results</h2>
          <div className="grid grid-cols-1 gap-4">
            {flightResults.map((flight) => (
              <Card key={flight.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          {flight.airline?.logoUrl ? (
                            <img
                              src={flight.airline.logoUrl || "/placeholder.svg"}
                              alt={flight.airline.name}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <Plane className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold">
                            {flight.airline?.name || "Airline"}
                          </div>
                          <div className="text-sm text-gray-500">
                            Flight {flight.flightNumber}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {flight.price?.amount
                            ? `${flight.price.amount} ${flight.price.currency}`
                            : "Price unavailable"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {flight.duration
                            ? `${Math.floor(flight.duration / 60)}h ${
                                flight.duration % 60
                              }m`
                            : "Duration unavailable"}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl font-bold">
                          {flight.departure?.time || "--:--"}
                        </div>
                        <div className="text-sm">
                          {flight.departure?.airport?.code || "DEP"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.departure?.airport?.name ||
                            "Departure Airport"}
                        </div>
                      </div>

                      <div className="flex-1 mx-4 relative">
                        <div className="border-t border-gray-300 absolute w-full top-1/2"></div>
                        <div className="flex justify-center">
                          <Plane className="transform rotate-90 bg-white px-1" />
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold">
                          {flight.arrival?.time || "--:--"}
                        </div>
                        <div className="text-sm">
                          {flight.arrival?.airport?.code || "ARR"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.arrival?.airport?.name || "Arrival Airport"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 border-t">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
