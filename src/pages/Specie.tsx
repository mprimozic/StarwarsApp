import { useEffect, useState } from 'react';
import { Params, Routes, useParams, Route } from 'react-router-dom';
import SpecieTable from '../components/Species/SpecieTable';
import { API_VEHICLES } from '../helpers/constants/swapiEndpoints';
import { ISpecie } from '../helpers/interfaces/ISpecie';
import { TSpecies } from '../helpers/types/TSpecies';
import { getUser } from '../services/users';
import { getVehicles } from '../services/vehicles';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import SpecieForm from '../components/Species/SpecieForm';
import { TSpecieVehicle } from '../helpers/types/TSpecieVehicle';
import { STORAGE_KEY_DROID, STORAGE_KEY_HUMAN } from '../helpers/constants/storageKeys';
import YoutubeEmbed from '../components/Species/YoutubeEmbed';
import { IStarship } from '../helpers/interfaces/IStarship';
import { getStarships } from '../services/starships';
import Starships from '../components/Species/Starships';
import DeleteSpecie from '../components/Species/DeleteSpecie';
import Films from './Films';

const Specie = ({ species }: TSpecies): JSX.Element => {
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [specieName, setSpecieName] = useState<string | undefined>('');
    const [userName, setUserName] = useState<string | undefined>('');
    const [specieVehicles, setSpecieVehicles] = useState<Array<TSpecieVehicle> | undefined>();
    const [specieVideo, setSpecieVideo] = useState<string>('');
    const [starships, setStarships] = useState<Array<IStarship>>();

    const params: Params<string> = useParams();

    useEffect(() => {
        setIsLoad(false);

        const specie: ISpecie | undefined = species.find(({ name }) => name.toLowerCase() === params.specieName);
        const userUrl: string = specie?.people ? specie.people[0] : '';

        setSpecieName(specie?.name);

        let specieVehiclesUrl: string = getSpecieVehiclesUrl(specie);

        if (userUrl && specieVehiclesUrl) {
            getUserAndSpecieVehiclesData(userUrl, specieVehiclesUrl);
        } else if (userUrl) {
            getUserDataAndStarships(userUrl);
        }
        
        getSpecieVideo(specie);
    }, [params]);



    const getSpecieVehiclesUrl = (specie: ISpecie | undefined) => {
        switch (specie?.name) {
            case 'Human':
                return API_VEHICLES;
            case 'Droid':
                return API_VEHICLES + '?search=droid';
            default:
                return '';
        }
    };

    const getUserAndSpecieVehiclesData = (userUrl: string, specieVehiclesUrl: string) => {
        const data: Promise<any> = Promise.all([getUser(userUrl), getVehicles(specieVehiclesUrl)]);

        const storageData: Array<TSpecieVehicle> = getDataFromStorage();

        data.then((result: Array<any>) => {
            setUserName(result[0]);
            setSpecieVehicles([...result[1], ...storageData]);
        })
            .catch(() => {
                console.error('Nekaj ni vredu!');
                // Ovdje bi podignuli neki modal s porukom upozorenja!
            })
            .finally(() => {
                setIsLoad(true);
            });

    };

    const getUserDataAndStarships = (userUrl: string) => {
        const data: Promise<any> = Promise.all([getUser(userUrl), getStarships()]);

        // const data: Promise<any> = getUser(userUrl);
        data.then((result: Array<any>) => {
            setUserName(result[0]);
            setStarships(result[1]);
        })
            .catch(() => {
                console.error('Nekaj ni vredu!');
            })
            .finally(() => {
                setIsLoad(true);
            });
    };

    const getDataFromStorage = (): Array<TSpecieVehicle> => {
        let vehiclesFromStorage: Array<TSpecieVehicle> = [];
        if(params.specieName === 'human') {
            const dataFromStorage = localStorage.getItem(STORAGE_KEY_HUMAN);
                if (dataFromStorage != null) {
                    vehiclesFromStorage = JSON.parse(dataFromStorage);
                }
        } else if (params.specieName === 'droid') {
            const dataFromStorage = localStorage.getItem(STORAGE_KEY_DROID);
                if (dataFromStorage != null) {
                    vehiclesFromStorage = JSON.parse(dataFromStorage);
                }
        }
        return vehiclesFromStorage;
    }

    const addNewVehicle = (e: any) => {
        e.preventDefault();
        const newVehicle: TSpecieVehicle = {
            name: e.target.childNodes[0].childNodes[1].childNodes[0].value,
            model: e.target.childNodes[1].childNodes[1].childNodes[0].value,
            manufacturer: e.target.childNodes[2].childNodes[1].childNodes[0].value,
            cost_in_credits: parseInt(e.target.childNodes[3].childNodes[1].childNodes[0].value)
        }

        specieVehicles?.push(newVehicle);
        if(specieVehicles) {
            setSpecieVehicles([...specieVehicles]);
        }

        setDataToStorage(newVehicle);
        e.target.reset();
    };

    const setDataToStorage = (newVehicle: TSpecieVehicle) => {
        const vehiclesArray: Array<TSpecieVehicle> = [newVehicle]

        switch (params.specieName) {
            case 'human':
                const dataFromHumanStorage = localStorage.getItem(STORAGE_KEY_HUMAN);
                if (dataFromHumanStorage != null) {
                    const vehiclesFromStorage: Array<TSpecieVehicle> = JSON.parse(dataFromHumanStorage);
                    vehiclesFromStorage.push(newVehicle);
                    localStorage.setItem(STORAGE_KEY_HUMAN, JSON.stringify(vehiclesFromStorage));
                } else {
                    localStorage.setItem(STORAGE_KEY_HUMAN, JSON.stringify(vehiclesArray));
                }
                break;       
            case 'droid':
                const dataFromDroidStorage = localStorage.getItem(STORAGE_KEY_DROID);
                if (dataFromDroidStorage != null) {
                    const vehiclesFromStorage: Array<TSpecieVehicle> = JSON.parse(dataFromDroidStorage);
                    vehiclesFromStorage.push(newVehicle);
                    localStorage.setItem(STORAGE_KEY_DROID, JSON.stringify(vehiclesFromStorage));
                } else {
                    localStorage.setItem(STORAGE_KEY_DROID, JSON.stringify(vehiclesArray));
                }
                break;                          
            default:
                break;
        }
    }

    const getSpecieVideo = (specie: ISpecie | undefined) => {
        switch (specie?.name) {
            case 'Human':
                setSpecieVideo('dOSzCHmP1xM');
                break;
            case 'Droid':
                setSpecieVideo('buJjccK98FQ');
                break;       
            default:
                break;
        }
    }

    const deleteVehicles = () => {
        const vehiclesFromStorage = getDataFromStorage();
        let filterVehicles;
        vehiclesFromStorage.map((vehicle) => (
            filterVehicles = specieVehicles?.filter((specieVehicle) => {
                return (specieVehicle.name !== vehicle.name);
            })
        ));
        setSpecieVehicles(filterVehicles);

        removeVehiclesFromStorage();
    }

    const removeVehiclesFromStorage = () => {
        switch (params.specieName) {
            case 'human':
                localStorage.removeItem(STORAGE_KEY_HUMAN);
                break;
            case 'droid':
                localStorage.removeItem(STORAGE_KEY_DROID);
                break;
        
            default:
                break;
        }
    }
    // return <SpecieTable isLoad={isLoad} specieName={specieName} userName={userName} specieVehicles={specieVehicles} />;

    // if (!isLoad) {
    //     return <Loader/>;
    // }
    return(    
        <>
            {!isLoad && <Loader/>}
            {isLoad && 
                <>
                    <Navbar specieName={specieName} userName={userName}/>
                    {(specieName !== 'Wookie') && 
                    <>
                        <SpecieTable specieName={specieName} specieVehicles={specieVehicles}/>
                        <DeleteSpecie specieName={specieName} deleteVehicles={deleteVehicles}></DeleteSpecie>
                        <SpecieForm handleSumbit={addNewVehicle}/>
                        <YoutubeEmbed videoId={specieVideo}/>
                     </>  
                    }
                    {(specieName === 'Wookie') &&
                        <>
                            <Starships starships={starships}/>
                            <Routes>                           
                                <Route path=":starship/films" element={<Films starships={starships}/>}></Route>
                            </Routes>
                        </>
                    }

                </> 
            }
            
        </>    
    );
};

export default Specie;
