import { IFilm } from "../../../helpers/interfaces/IFilm";

const StarshipCard = ({films}: any) => {
    console.log(films);
    return(
        <div className="container">
            <div className="row">
                {films.map((film: IFilm, key: number) => (
                    <div className="col-4 mt-5 card" key={key}>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Title: </b>
                                {film.title}
                            </li>
                            <li className="list-group-item">
                                <b>Episode ID: </b>
                                {film.episode_id}
                            </li>
                            <li className="list-group-item">
                                <b>Release date:</b>
                                {film.release_date}
                            </li>
                            <li className="list-group-item">
                                <b>Image: </b>
                                <img 
                                    src={require('../../../assets/images/' + film.title.replace(/ /g,"_").toLowerCase() + '.jpeg')} 
                                    alt="" 
                                    width={100}
                                    height={100}
                                    className="d-inline-block align-top me-2"/>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StarshipCard;