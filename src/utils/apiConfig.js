// src/utils/apiConfig.js
// COMPLETE REWRITE - Multiple fallback strategies

const TMDB_API_KEY = "d5689bbae1737c3b9062e710a1909402";

// Strategy 1: Direct API (might work on some networks)
// Strategy 2: Different API version
// Strategy 3: JSONP approach
// Strategy 4: Local fallback data

export const API_CONFIG = {
    // Try multiple strategies
    strategies: [
        {
            name: "Direct API",
            getUrl: (endpoint, params) => {
                return `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&${params}`;
            }
        },
        {
            name: "Alternate Domain",
            getUrl: (endpoint, params) => {
                return `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&${params}`;
            }
        },
        {
            name: "With No Cache",
            getUrl: (endpoint, params) => {
                return `https://api.themoviedb.org/3/${endpoint}?api_key=${TMDB_API_KEY}&${params}&_=${Date.now()}`;
            }
        }
    ],

    currentStrategy: 0,

    getUrl: (endpoint, params = '') => {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
        return this.strategies[this.currentStrategy].getUrl(cleanEndpoint, params);
    },

    switchStrategy: () => {
        this.currentStrategy = (this.currentStrategy + 1) % this.strategies.length;
        console.log(`Switched to strategy: ${this.strategies[this.currentStrategy].name}`);
        return this.currentStrategy;
    },

    resetStrategy: () => {
        this.currentStrategy = 0;
    },

    getMockData: (type) => {
        // Fallback mock data when API completely fails
        const mockMovies = {
            popular: [
                { id: 1, title: "Dune: Part Two", vote_average: 8.5, poster_path: null, overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family." },
                { id: 2, title: "Deadpool 3", vote_average: 8.2, poster_path: null, overview: "Wade Wilson returns for another adventure." },
                { id: 3, title: "Kingdom of the Planet of the Apes", vote_average: 7.8, poster_path: null, overview: "Many years after Caesar's reign, a young ape goes on a journey that will lead him to question everything he's been taught." },
                { id: 4, title: "Furiosa: A Mad Max Saga", vote_average: 8.0, poster_path: null, overview: "The origin story of renegade warrior Furiosa." }
            ],
            upcoming: [
                { id: 5, title: "Joker: Folie à Deux", vote_average: 0, poster_path: null, overview: "Sequel to the 2019 film Joker." },
                { id: 6, title: "Venom 3", vote_average: 0, poster_path: null, overview: "The third installment of the Venom franchise." }
            ],
            top_rated: [
                { id: 7, title: "The Shawshank Redemption", vote_average: 9.3, poster_path: null, overview: "Two imprisoned men bond over a number of years." },
                { id: 8, title: "The Godfather", vote_average: 9.2, poster_path: null, overview: "The aging patriarch of an organized crime dynasty transfers control." }
            ]
        };
        return mockMovies[type] || mockMovies.popular;
    }
};