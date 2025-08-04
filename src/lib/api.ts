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
            'Authorization': `Bearer ${token}`,
            // The x-captcha header is required by some endpoints.
            // Send empty for Bearer token authenticated server-to-server requests.
            'x-captcha': '' 
        },
        next: { revalidate: 3600 } 
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hotel definitions from API.');
    }

    return response.json();
}

/**
 * Fetches price offers from the API based on search criteria.
 * This function is built to precisely match the working cURL example from documentation.
 * 
 * @param fromDate The check-in date ('YYYY-MM-DD').
 * @param toDate The check-out date ('YYYY-MM-DD').
 * @param adultCount The number of adults.
 * @param childrenCount The number of children.
 * @returns A promise resolving to the API's price offers.
 */
export async function getPriceOffers(fromDate: string, toDate: string, adultCount: string, childrenCount: string) {
    const baseUrl = process.env.API_BASE_URL;
    const hotelId = process.env.HOTEL_ID;
    const token = process.env.API_BEARER_TOKEN;

    if (!baseUrl || !hotelId || !token) {
        throw new Error("API environment variables are not configured.");
    }
    
    // Builds the query parameters safely, matching the required structure.
    const params = new URLSearchParams({
        fromdate: fromDate,
        todate: toDate,
        adult: adultCount,
        // The API requires these parameters to be present, even if empty.
        childage: '', 
        currency: 'EUR',
        nationality: '',
        onlybestoffer: 'false',
        language: 'en',
        promocode: '',
    });

    const url = `${baseUrl}/hotel/${hotelId}/price?${params.toString()}`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-captcha': ''
        },
        // Price and availability must not be cached.
        cache: 'no-store'
    });

    if (!response.ok) {
        console.error("API Request Failed. URL:", url);
        console.error("API Response:", await response.text());
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
        console.error("getHotelParams API request failed:", response.status, await response.text());
        throw new Error('Failed to fetch hotel parameters.');
    }

    return response.json();
}