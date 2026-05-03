// src/utils/apiHelper.js

// Check if TMDB API is accessible
export const checkAPIAccessibility = async () => {
    const API_KEY = "d5689bbae1737c3b9062e710a1909402";
    const testUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(testUrl, {
            signal: controller.signal,
            method: 'GET',
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            return { accessible: true, error: null };
        } else if (response.status === 401) {
            return { accessible: false, error: "API_KEY" };
        } else {
            return { accessible: false, error: "NETWORK" };
        }
    } catch (error) {
        console.error("API Accessibility Check:", error);

        if (error.name === "AbortError") {
            return { accessible: false, error: "TIMEOUT" };
        } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            return { accessible: false, error: "NETWORK" };
        }

        return { accessible: false, error: "UNKNOWN" };
    }
};

// Get user-friendly error message
export const getErrorMessage = (errorType, region = "IN") => {
    const messages = {
        NETWORK: {
            title: "🌐 Network Connection Issue",
            message: "Unable to connect to the movie database. This could be due to network restrictions in your region.",
            suggestions: [
                "Check your internet connection",
                "Try using a VPN (Recommended for Jio/Airtel users)",
                "Try using a different network (mobile data instead of WiFi, or vice versa)",
                "Disable any ad-blockers or firewall",
                "Try again after a few minutes"
            ],
            action: "Enable VPN or switch network"
        },
        TIMEOUT: {
            title: "⏱️ Connection Timeout",
            message: "The request took too long to complete. The movie database might be slow or blocked.",
            suggestions: [
                "Check your internet speed",
                "Try using a VPN for better connectivity",
                "Try again when the network is less congested",
                "Switch to a faster network if available"
            ],
            action: "Use VPN or try later"
        },
        API_KEY: {
            title: "🔑 API Authentication Error",
            message: "Unable to authenticate with the movie database.",
            suggestions: [
                "Refresh the page and try again",
                "Contact support if the issue persists"
            ],
            action: "Refresh page"
        },
        UNKNOWN: {
            title: "❓ Unknown Error",
            message: "Something went wrong while connecting to the movie database.",
            suggestions: [
                "Try using a VPN",
                "Check your internet connection",
                "Clear your browser cache",
                "Try again after some time"
            ],
            action: "Use VPN or try again"
        }
    };

    return messages[errorType] || messages.UNKNOWN;
};