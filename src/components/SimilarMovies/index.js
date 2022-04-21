import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apikey } from "../../config/Key";
import './styles.css';


export default function SimilarMovies({id}) {

    const image_path = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState([]);

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apikey}&language=en-US&page=1`)
        .then(res => res.json())
        .then(data => {
            setMovies(data.results)            
        })

        
    }, [id] );


    return (
        <ul className="similar-container">
                {movies.map( movie => {
                    const { id, poster_path, title } = movie;

                    return (
                        <li key={id}>
                            <Link to={`/details/${id}`}>
                               <img src={`${image_path}${poster_path}`} alt={title}/>
                            </Link>
                        </li>
                    );
                })}
            
        </ul>
    );
}