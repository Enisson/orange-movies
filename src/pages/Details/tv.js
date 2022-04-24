import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apikey } from "../../config/Key";

import timer from '../../assets/icons/timer.svg';
import fav from '../../assets/icons/heart.svg';
import './styles.css'
import SimilarMovies from "../../components/SimilarMovies";
import MovieCrew from "../../components/MovieCrew";
import MovieCast from "../../components/MovieCast";
import Trailers from "../../components/Trailers";


export default function DetailsTv() {

    const { id } = useParams();
    
    const [movie, setMovie] = useState({});
    const [genre, setGenre] = useState([]);
    const [releaseDate, setReleaseDate] = useState();
    



    const image_path = "https://image.tmdb.org/t/p/original";
    const image_path500 = "https://image.tmdb.org/t/p/w500";


    useEffect(  () => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apikey}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const { name, tagline, vote_average, release_date, poster_path, overview, genres, backdrop_path, runtime, vote_count } = data;

            const movie = {
                name,
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
            setGenre(movie.genres);
            setMovie(movie);

            let release = movie.releaseDate;
            let splitStr = release.split("-");
            let replaceStr = splitStr.reverse();
            let releaseDta = replaceStr.join("/");
            setReleaseDate(releaseDta);
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
                <img src={movie.backPoster} alt={movie.name} />
            </div>
            <div className="movie-info">
                <div className="movie-poster">
                    <img src={movie.poster} alt={movie.name} />
                </div>

                <div className="movie-details">
                    <span className="movie-release-date">2022</span>
                    <h2 className="movie-title">{movie.name}</h2>
                    <span className="runtime">
                        <img src={timer} alt={movie.name}/>
                        {convertTimer()}
                    </span>
                    <div className="vote-container">
                        <span  className={moviePop()}>{movie.voteAverage}</span>
                        <span className="vote-count">{`${movie.voteCount} votos`}</span>
                    </div>
                    <span className="tagline">{movie.tagline}</span>
                    <span className="favorite"><img src={fav} alt="favorite" /></span>
                </div>
            </div>

            <div className="movie-overview-container">
                <ul className="movie-description">
                    <li className="movie-description-genre">
                        <h3>Gênero</h3>
                        <ul>
                            {
                                genre.map( item => {
                                    return <li key={item.id}>{item.name}</li>
                                })
                            }
                        </ul>
                    </li>

                    {/* <MovieCrew id={id}/> */}
                    
                    <li>
                        <h3>Ano de lançamento</h3>
                        <p>{releaseDate}</p>
                    </li>
                </ul>
                    <div className="movie-overview">
                        <h2>Sinopse</h2>
                        <p>{movie.sinopse}</p>
                    </div>
                    <div className="movie-similar">
                        <span>
                            <h2>Similares</h2>
                        </span>

                        {/* <SimilarMovies id={id}/> */}
                    </div>

                    <div className="movie-cast" >
                        <h2>Elenco Principal</h2>

                        {/* <MovieCast id={id} />                         */}
                    </div>

                    <div className="trailer">
                        <h2>Assista ao trailer</h2>

                        <Trailers id={id} img={`${image_path}${movie.backPoster}`}/>
                    </div>
                </div>

        </div>
    );
}