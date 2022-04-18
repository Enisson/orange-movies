import { useEffect, useState } from "react";

import { apikey } from "../../config/Key";
import './styles.css';

export default function TopActors() {

    const [profileActor, setProfileActor] = useState([]);

    const image_path = "https://image.tmdb.org/t/p/w500";


    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/person/popular?api_key=${apikey}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => {
            setProfileActor(data.results);
        });
    }, [] )

    return (
        <ul className="top-actors-container">
            {profileActor.map((actor, index) => {
                const { id, name, profile_path } = actor;

                if(index <= 6) {
                    return (
                            <li className="top-actor-actress__item" key={id}>
                                <div className="img">
                                    <img src={`${image_path}${profile_path}`} alt={name}/>
                                </div>
                                <h3>{name}</h3>
                                <span>Ver mais</span>
                            </li>    
                 );
                }
                

            })}
        </ul>
    );
}