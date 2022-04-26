import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apikey } from "../../config/Key";
import './styles.css';


export default function SimilarTv({id}) {

    const image_path = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState([]);

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apikey}&language=pt-BR&page=1`)
        .then(res => res.json())
        .then(data => {
            console.log(data.results)
            setMovies(data.results)            
        })

        
    }, [id] );


    return (
        <ul className="similar-container">
                {movies.map( movie => {
                    const { id, poster_path, title } = movie;

                    return (
                        <li key={id}>
                            <Link to={`/details/tv/${id}`}>
                               <img src={`${image_path}${poster_path}`} alt={title}/>
                            </Link>
                        </li>
                    );
                })}
            
        </ul>
    );
}