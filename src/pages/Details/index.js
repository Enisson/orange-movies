import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apikey } from "../../config/Key";

import timer from '../../assets/icons/timer.svg';
import fav from '../../assets/icons/heart.svg';
import './styles.css'
import SimilarMovies from "../../components/SimilarMovies";

export default function Details() {

    const { id } = useParams();
    
    const [movie, setMovie] = useState({});
    const image_path = "https://image.tmdb.org/t/p/original";
    const image_path500 = "https://image.tmdb.org/t/p/w500";


    useEffect(  () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const { title, tagline, vote_average, release_date, poster_path, overview, genres, backdrop_path, runtime, vote_count } = data;

            const movie = {
                title,
                tagline,
                voteAverage: vote_average,
                releaseDate: release_date,
                sinopse: overview,
                poster: `${image_path500}${poster_path}`,
                backPoster: `${image_path}${backdrop_path}`,
                genres,
                runtime,
                voteCount: vote_count
            }

            setMovie(movie);
        })
        
    }, [id])
    
    const convertTimer = () => {
        const t = movie.runtime;

        const h = Math.floor(t / 60);
        const m = Math.floor(t % 3600 / 60);

        const hDisplay = `${h}h ${m}m`;

        return hDisplay;
    }

    let className = "movie-popularity"
    
    const moviePop = () => {

        let movieAve = movie.voteAverage;

        if(movieAve <= 5) {
            className = "movie-less";
        };
        if (movieAve >= 7) {
            className = "movie-high";
        };

        return className
    }

    return(
        <div className="details-container">
            <div className="backposter">
                <img src={movie.backPoster} alt={movie.title} />
            </div>
            <div className="movie-info">
                <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                </div>

                <div className="movie-details">
                    <span className="movie-release-date">2022</span>
                    <h2 className="movie-title">{movie.title}</h2>
                    <span className="runtime">
                        <img src={timer} alt={movie.title}/>
                        {convertTimer()}
                    </span>
                    <div className="vote-container">
                        <span  className={moviePop()}>{movie.voteAverage}</span>
                        <span className="vote-count">{`${movie.voteCount} votos`}</span>
                    </div>
                    <span className="tagline">{movie.tagline}</span>
                    <span className="favorite"><img src={fav} alt="favorite" /></span>
                </div>

                <div className="movie-overview-container">
                    <div className="movie-overview">
                        <h2>Sinopse</h2>
                        <p>{movie.sinopse}</p>
                    </div>
                    <div className="movie-similar">
                        <span>
                            <h2>Similares</h2>
                        </span>

                        <SimilarMovies id={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
}