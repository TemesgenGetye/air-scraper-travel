// API service for making requests to Sky Scrapper API

const RAPIDAPI_KEY = "78739647c4msh1ee7b6e93ef7321p1e5372jsn497e89ec1dd4";
const RAPIDAPI_HOST = "sky-scrapper.p.rapidapi.com";

const API_BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1";

const headers = {
  "x-rapidapi-key": RAPIDAPI_KEY,
  "x-rapidapi-host": RAPIDAPI_HOST,
};

export async function searchAirports(query) {
  try {
    const url = `${API_BASE_URL}/flights/searchAirport?query=${encodeURIComponent(
      query
    )}&locale=en-US`;
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching airports:", error);
    throw error;
  }
}

export async function searchFlights(params) {
  // This would be implemented for a real flight search
  // For now, we'll return mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockFlights(params));
    }, 1500);
  });
}

async function searchHotels(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockHotels(query));
    }, 1000);
  });
}

async function searchCarLocations(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockCarLocations(query));
    }, 1000);
  });
}

function getMockFlights(params) {
  return [
    {
      id: "1",
      airline: "Delta Airlines",
      flightNumber: "DL1234",
      departureAirport: params.origin || "JFK",
      arrivalAirport: params.destination || "LAX",
      departureTime: "08:30",
      arrivalTime: "11:45",
      duration: "3h 15m",
      stops: 0,
      price: 299,
      cabinClass: params.cabinClass || "ECONOMY",
    },
    {
      id: "2",
      airline: "American Airlines",
      flightNumber: "AA5678",
      departureAirport: params.origin || "JFK",
      arrivalAirport: params.destination || "LAX",
      departureTime: "10:15",
      arrivalTime: "14:30",
      duration: "4h 15m",
      stops: 1,
      stopAirports: ["ATL"],
      price: 249,
      cabinClass: params.cabinClass || "ECONOMY",
    },
    {
      id: "3",
      airline: "United Airlines",
      flightNumber: "UA9012",
      departureAirport: params.origin || "JFK",
      arrivalAirport: params.destination || "LAX",
      departureTime: "12:45",
      arrivalTime: "16:20",
      duration: "3h 35m",
      stops: 0,
      price: 329,
      cabinClass: params.cabinClass || "ECONOMY",
    },
    {
      id: "4",
      airline: "Southwest Airlines",
      flightNumber: "WN3456",
      departureAirport: params.origin || "JFK",
      arrivalAirport: params.destination || "LAX",
      departureTime: "14:30",
      arrivalTime: "19:15",
      duration: "4h 45m",
      stops: 1,
      stopAirports: ["DEN"],
      price: 199,
      cabinClass: params.cabinClass || "ECONOMY",
    },
    {
      id: "5",
      airline: "JetBlue",
      flightNumber: "B6789",
      departureAirport: params.origin || "JFK",
      arrivalAirport: params.destination || "LAX",
      departureTime: "16:20",
      arrivalTime: "20:05",
      duration: "3h 45m",
      stops: 0,
      price: 279,
      cabinClass: params.cabinClass || "ECONOMY",
    },
  ];
}

function getMockHotels(query) {
  return [
    {
      id: "hotel1",
      name: "Mock Hotel 1",
      city: query || "New York",
      rating: 4,
    },
    {
      id: "hotel2",
      name: "Mock Hotel 2",
      city: query || "London",
      rating: 5,
    },
  ];
}

function getMockCarLocations(query) {
  return [
    {
      id: "car1",
      name: "Mock Car Location 1",
      city: query || "New York",
    },
    {
      id: "car2",
      name: "Mock Car Location 2",
      city: query || "London",
    },
  ];
}

export { searchHotels, searchCarLocations };
