// src/utils/movieService.js
import axios from "axios";
import { API_CONFIG } from "./apiConfig";

class MovieService {
    constructor() {
        this.maxRetries = 3;
    }

    async fetchWithRetry(endpoint, params = '', retryCount = 0) {
        try {
            const url = API_CONFIG.getUrl(endpoint, params);
            console.log(`Attempt ${retryCount + 1}: Fetching from ${API_CONFIG.strategies[API_CONFIG.currentStrategy].name}`);

            const response = await axios.get(url, {
                timeout: 8000,
                headers: {
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache'
                }
            });

            if (response.data && response.data.results) {
                return { success: true, data: response.data };
            }

            throw new Error("Invalid response format");

        } catch (error) {
            console.error(`Attempt ${retryCount + 1} failed:`, error.message);

            if (retryCount < this.maxRetries - 1) {
                // Switch strategy and retry
                API_CONFIG.switchStrategy();
                await new Promise(resolve => setTimeout(resolve, 1000));
                return this.fetchWithRetry(endpoint, params, retryCount + 1);
            }

            // All retries failed, return mock data
            console.log("All strategies failed, using mock data");
            const mockData = API_CONFIG.getMockData(endpoint.split('/')[1]);
            return {
                success: false,
                data: { results: mockData },
                usingMock: true
            };
        }
    }

    async getMovies(type, page = 1) {
        const result = await this.fetchWithRetry(type, `language=en-US&page=${page}`);
        return result;
    }

    async getMovieDetails(id) {
        const result = await this.fetchWithRetry(`movie/${id}`, `language=en-US`);
        return result;
    }

    async getMovieCast(id) {
        const result = await this.fetchWithRetry(`movie/${id}/credits`, `language=en-US`);
        return result;
    }

    async searchMovies(query) {
        const result = await this.fetchWithRetry(`search/movie`, `language=en-US&query=${encodeURIComponent(query)}&page=1`);
        return result;
    }
}

export const movieService = new MovieService();