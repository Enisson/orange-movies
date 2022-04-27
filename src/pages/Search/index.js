import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { apikey } from "../../config/Key";

import './styles.css';


export default function Search({valor}) {

    const [movies, setMovies] = useState([]);
    const image_path = "https://image.tmdb.org/t/p/w500";
    
    console.log(valor)
    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=pt-BR&query=batman`)
        .then(response => response.json())
        .then(data => {
            setMovies(data.results)
        });
    }, [valor] );

    return (
        <div className="search-container">
            {movies.map(movie => {
                const {id, title, overview, release_date, poster_path} = movie;

                return (
                    <div key={id} className="movie-content">
                        <Link to={`/details/movie/${id}`}>
                            <img src={`${image_path}${poster_path}`} alt={title}/>
                        </Link>
                        <div className="movie-overview">
                            <h2>{title}</h2>
                            <span>{release_date}</span>
                            <p>{overview}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}