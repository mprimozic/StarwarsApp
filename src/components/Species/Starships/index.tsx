import { Link } from "react-router-dom";
import { IStarship } from "../../../helpers/interfaces/IStarship";
import { TStarships } from "../../../helpers/types/TStarships";

const Starships = ({starships}: any) => {
    return(
        <div className="container">
            <div className="row">
                {starships.map((starship: IStarship, key:number) => (
                    <div className="col-4 mt-3 card" key={key}>
                        <Link to={`${starship.name.replace(/\s/g, '')}/films`}>                           
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name: </b>
                                    {starship.name}
                                </li>
                                <li className="list-group-item">
                                    <b>Model: </b>
                                    {starship.model}
                                </li>
                                <li className="list-group-item">
                                    <b>Cost in credits: </b>
                                    {starship.cost_in_credits}
                                </li>
                                <li className="list-group-item">
                                    <b>Starship class: </b>
                                    {starship.starship_class}
                                </li>
                            </ul>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Starships;