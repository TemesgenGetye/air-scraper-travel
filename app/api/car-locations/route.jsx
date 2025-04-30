export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return new Response(JSON.stringify({ status: false, message: "Query parameter is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }

  try {
    const apiUrl = `https://air-scraper.p.rapidapi.com/api/v1/cars/searchLocation?query=${encodeURIComponent(query)}`

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "your-rapidapi-key",
        "X-RapidAPI-Host": "air-scraper.p.rapidapi.com",
      },
    })

    const data = await response.json()

    return new Response(JSON.stringify({ status: true, data }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching car locations:", error)
    return new Response(JSON.stringify({ status: false, message: "Failed to fetch car locations" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
}
