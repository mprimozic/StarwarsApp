import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { IFilm } from "../helpers/interfaces/IFilm";
import { IStarship } from "../helpers/interfaces/IStarship";
import { getFilms } from "../services/film";
import Loader from "../components/Loader";
import StarshipCard from "../components/Species/StarshipCard";

const Films = ({starships} :any) => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [films, setFilms] = useState<Array<IFilm>>();

    const params: Params<string> = useParams();

    useEffect(() => {
        setIsLoad(false);

        const starship: IStarship = starships.find((starship: IStarship) => starship.name.replace(/\s/g, '') === params.starship);

        const films: Promise<any> = getFilms(starship.films);
        films.then((films: Array<IFilm>) => {
                setFilms(films);
            }).finally(() => {
                setIsLoad(true);
            }
        );
        console.log(films);


    }, [params])


    return(
        <>
            {
                !isLoad && <Loader/>
            }
            {
                isLoad && <StarshipCard films={films}/>
            }
        </>
    );
}

export default Films;