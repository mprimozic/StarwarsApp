import { getResource } from "../adapters/xhr/axios";
import { IFilm } from "../helpers/interfaces/IFilm";
import { API_BASE_URL } from "./../helpers/constants/swapiEndpoints";

export const getFilms = async (urls: Array<string>): Promise<any> => {
    const films: Array<IFilm> = [];
    try {
        for (const url of urls) {
            const filmUrl = url.replace(API_BASE_URL, '');
            const response = await getResource(filmUrl);
            const filmObject = response.data;
            films.push({
                title: filmObject.title,
                episode_id: filmObject.episode_id,
                release_date: filmObject.release_date           
            });         
        }        
    } catch (error) {
        console.error(error);
    }
    return films;
}