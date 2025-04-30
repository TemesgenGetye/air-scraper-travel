"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Use Next.js router
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function FlightDetails() {
  const router = useRouter();
  const { id } = router.query; // Get the flight ID from the query parameters
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState([
    {
      type: "adult",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
    },
  ]);

  useEffect(() => {
    if (!id) return; // Wait for the query parameters to load

    const fetchFlightDetails = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock flight data based on ID
        const mockFlight = {
          id: id,
          airline: "Delta Airlines",
          flightNumber: "DL1234",
          departureAirport: router.query.origin || "JFK",
          arrivalAirport: router.query.destination || "LAX",
          departureTime: "08:30",
          arrivalTime: "11:45",
          duration: "3h 15m",
          departureDate: router.query.departDate || "2023-08-15",
          returnDate: router.query.returnDate || "",
          stops: 0,
          price: 299,
          cabinClass: "ECONOMY",
          aircraft: "Boeing 737-800",
          departureTerminal: "Terminal 4",
          arrivalTerminal: "Terminal 2",
          baggage: {
            carryOn: "1 bag (7kg)",
            checked: "1 bag (23kg)",
          },
          amenities: ["Wi-Fi", "Power outlets", "In-flight entertainment"],
          cancellationPolicy: "Free cancellation within 24 hours of booking",
        };

        setFlight(mockFlight);
      } catch (err) {
        console.error("Error fetching flight details:", err);
        setError("Failed to fetch flight details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [id, router.query]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengerDetails(updatedPassengers);
  };

  const addPassenger = (type) => {
    setPassengerDetails([
      ...passengerDetails,
      { type, firstName: "", lastName: "", email: "", phone: "", dob: "" },
    ]);
  };

  const removePassenger = (index) => {
    if (passengerDetails.length > 1) {
      const updatedPassengers = [...passengerDetails];
      updatedPassengers.splice(index, 1);
      setPassengerDetails(updatedPassengers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would submit the booking details to the API
    alert("Booking submitted successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg
                className="animate-spin h-12 w-12 text-gray-600 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Loading flight details
              </h2>
              <p className="text-gray-600">This may take a moment...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !flight) {
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
              <p className="text-gray-600 mb-4">
                {error || "Flight details not found"}
              </p>
              <button
                onClick={() => router.push("/flights/search")}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Back to Search Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            to="/flights/search"
            className="text-gray-800 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Search Results
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Flight Details
          </h2>

          <div className="border-b pb-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                  <span className="font-bold text-gray-700">
                    {flight.airline.split(" ")[0][0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{flight.airline}</h3>
                  <p className="text-gray-600">Flight {flight.flightNumber}</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                ${flight.price}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-gray-600 mb-1">Departure</div>
                <div className="text-2xl font-bold">{flight.departureTime}</div>
                <div className="text-lg">{flight.departureDate}</div>
                <div className="text-gray-600">{flight.departureAirport}</div>
                <div className="text-gray-600">{flight.departureTerminal}</div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="text-gray-600 mb-1">{flight.duration}</div>
                <div className="relative w-full">
                  <div className="border-t-2 border-gray-300 absolute w-full top-1/2"></div>
                  {flight.stops > 0 ? (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border border-gray-300 text-sm">
                      {flight.stops} stop
                    </div>
                  ) : (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full border border-gray-300 text-sm">
                      Nonstop
                    </div>
                  )}
                </div>
                <div className="text-gray-600 mt-2">{flight.aircraft}</div>
              </div>

              <div>
                <div className="text-gray-600 mb-1">Arrival</div>
                <div className="text-2xl font-bold">{flight.arrivalTime}</div>
                <div className="text-lg">{flight.departureDate}</div>
                <div className="text-gray-600">{flight.arrivalAirport}</div>
                <div className="text-gray-600">{flight.arrivalTerminal}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-4">Baggage Information</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold">Carry-on Baggage</div>
                    <div className="text-gray-600">
                      {flight.baggage.carryOn}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold">Checked Baggage</div>
                    <div className="text-gray-600">
                      {flight.baggage.checked}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Amenities</h3>
              <div className="space-y-3">
                {flight.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="font-semibold">{amenity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-4">Cancellation Policy</h3>
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-gray-600">{flight.cancellationPolicy}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Passenger Information
          </h2>

          <form onSubmit={handleSubmit}>
            {passengerDetails.map((passenger, index) => (
              <div key={index} className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">
                    Passenger {index + 1} (
                    {passenger.type.charAt(0).toUpperCase() +
                      passenger.type.slice(1)}
                    )
                  </h3>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`firstName-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id={`firstName-${index}`}
                      value={passenger.firstName}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "firstName",
                          e.target.value
                        )
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`lastName-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id={`lastName-${index}`}
                      value={passenger.lastName}
                      onChange={(e) =>
                        handlePassengerChange(index, "lastName", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor={`dob-${index}`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id={`dob-${index}`}
                    value={passenger.dob}
                    onChange={(e) =>
                      handlePassengerChange(index, "dob", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>

                {index === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={passenger.email}
                        onChange={(e) =>
                          handlePassengerChange(index, "email", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={passenger.phone}
                        onChange={(e) =>
                          handlePassengerChange(index, "phone", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => addPassenger("adult")}
                className="px-4 py-2 border border-gray-600 text-gray-600 rounded-md hover:bg-gray-50"
              >
                Add Adult
              </button>
              <button
                type="button"
                onClick={() => addPassenger("child")}
                className="px-4 py-2 border border-gray-600 text-gray-600 rounded-md hover:bg-gray-50"
              >
                Add Child
              </button>
              <button
                type="button"
                onClick={() => addPassenger("infant")}
                className="px-4 py-2 border border-gray-600 text-gray-600 rounded-md hover:bg-gray-50"
              >
                Add Infant
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold">Price Summary</div>
                <div className="text-2xl font-bold text-gray-800">
                  ${flight.price * passengerDetails.length}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
