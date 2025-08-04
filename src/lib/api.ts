/**
 * Fetches the main hotel definitions from the API.
 * This includes data for room types, board types, etc.
 * This function is designed to be called from Server Components.
 */
export async function getHotelDefinitions() {
    // This function remains unchanged as it works correctly for its purpose.
    const baseUrl = process.env.API_BASE_URL;
    const hotelId = process.env.HOTEL_ID;
    const token = process.env.API_BEARER_TOKEN;

    if (!baseUrl || !hotelId || !token) {
        throw new Error("API environment variables are not configured.");
    }

    const url = `${baseUrl}/hotel/${hotelId}/hotel-definitions?language=TR&room-details=true`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
        next: { revalidate: 3600 } 
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hotel definitions from API.');
    }

    return response.json();
}

/**
 * Fetches price offers from the API based on search criteria.
 * This function builds the exact URL that worked in Postman.
 * 
 * @param fromDate The check-in date ('YYYY-MM-DD').
 * @param toDate The check-out date ('YYYY-MM-DD').
 * @param adultCount The number of adults.
 * @param childCount The number of children (for future use).
 * @returns A promise resolving to the API's price offers.
 */
export async function getPriceOffers(fromDate: string, toDate: string, adultCount: string, childCount: string) {
    const baseUrl = process.env.API_BASE_URL;
    const hotelId = process.env.HOTEL_ID;
    const token = process.env.API_BEARER_TOKEN;

    if (!baseUrl || !hotelId || !token) {
        throw new Error("API environment variables are not configured.");
    }
    
    // This part builds the query parameters safely, matching the Postman request.
    const params = new URLSearchParams({
        fromdate: fromDate,
        todate: toDate,
        adult: adultCount,
        childage: '', // Sending empty as per the Postman test.
        currency: 'EUR', // Using EUR as a default for now.
        nationality: '',
        onlybestoffer: 'false',
        language: 'en',
        promocode: '',
    });

    const url = `${baseUrl}/hotel/${hotelId}/price?${params.toString()}`; // query parematre
    
    console.log(`FETCHING URL: ${url}`); // This logs the final URL to the server terminal.

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        console.error("API Request Failed with status:", response.status, await response.text());
        throw new Error(`Failed to fetch price offers. Status: ${response.status}`);
    }

    return response.json();
}

/**
 * Fetches the main hotel configuration parameters from the API.
 * It's designed to be called from Server Components.
 */
export async function getHotelParams() {
    const baseUrl = process.env.API_BASE_URL;
    const hotelId = process.env.HOTEL_ID;
    const token = process.env.API_BEARER_TOKEN;

    if (!baseUrl || !hotelId || !token) {
        throw new Error("API environment variables are not configured.");
    }

    // FIX: The URL now includes the required 'language=TR' query parameter.
    // The API returned a 400 error because this was missing.
    const url = `${baseUrl}/hotel/${hotelId}/params?language=TR`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'x-captcha': '' 
        },
        next: { revalidate: 3600 } 
    });

    if (!response.ok) {
        // Log the detailed error from the API to the server console for better debugging.
        console.error("getHotelParams API request failed:", response.status, await response.text());
        throw new Error('Failed to fetch hotel parameters.');
    }

    return response.json();
}