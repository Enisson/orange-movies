import { useEffect, useState } from "react";
import { apikey } from "../../config/Key";

import './styles.css';

export default function MovieCast({id}) {

    const [cast, setCast] = useState([]);

    const image_path = "https://image.tmdb.org/t/p/w500";


    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {            
            setCast(data.cast);
        })
    }, [id] );

    //character
    //name
    //profile_path
    //cast_id


    return (
        <>
            <ul className="cast">

                {cast.map( item => {

                    return (
                        <li key={item.id}>
                           <img src={`${image_path}${item.profile_path}`} alt={item.name} /> 
                           <span className="name">{item.name}</span>
                           <span className="character">{item.character}</span>
                        </li>
                    )
                })}
                
        
            </ul>

        </>
    );
}