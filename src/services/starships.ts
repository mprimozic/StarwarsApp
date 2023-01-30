import { getResource } from "../adapters/xhr/axios"
import { API_STARSHIPS } from "../helpers/constants/swapiEndpoints";

export const getStarships = async () => {
   try {
        const response = await getResource(API_STARSHIPS);
        return response.data.results;
   } catch (error) {
        console.error(error);
   }
}