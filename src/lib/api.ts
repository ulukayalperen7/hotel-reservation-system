/**
 * Fetches the main hotel definitions from the API.
 * This includes data for room types, board types, etc.
 * This function is designed to be called from Server Components.
 */
export async function getHotelDefinitions() {
    const baseUrl = process.env.API_BASE_URL;
    const hotelId = process.env.HOTEL_ID;
    const token = process.env.API_BEARER_TOKEN;

    if (!baseUrl || !hotelId || !token) {
        throw new Error("API environment variables are not configured.");
    }

    const url = `${baseUrl}/hotel/${hotelId}/hotel-definitions?language=TR`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        // This is for performance. It tells Next.js to cache the data.
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
        // If the API gives an error, we stop and show the error.
        throw new Error('Failed to fetch hotel definitions from API.');
    }

    return response.json();
}