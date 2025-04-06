export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is missing!" }), {
        status: 500,
      });
    }
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        return new Response(JSON.stringify(data), { status: response.status });
      }
  
      return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Something went wrong!" }), {
        status: 500,
      });
    }
  }
  