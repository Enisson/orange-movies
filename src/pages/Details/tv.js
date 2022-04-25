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
import SimilarTv from "../../components/SimilarTv";
import TvCast from "../../components/TvCast";
import TvTrailers from "../../components/Trailers/tvTrailers";


export default function DetailsTv() {

    const { id } = useParams();
    
    const [movie, setMovie] = useState({});
    const [genre, setGenre] = useState([]);
    const [created, setCreated] = useState();
    const [networks, setNetworks] = useState([]);
    const [releaseDate, setReleaseDate] = useState();
    const [releaseDateY, setReleaseDateY] = useState();
    



    const image_path = "https://image.tmdb.org/t/p/original";
    const image_path500 = "https://image.tmdb.org/t/p/w500";


    useEffect(  () => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apikey}&language=pt-BR`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const { name, tagline, created_by,networks, vote_average, first_air_date, poster_path, overview, genres, backdrop_path, episode_run_time, vote_count, number_of_episodes, number_of_seasons } = data;

            const movie = {
                name,
                tagline,
                networks,
                created: created_by,
                voteAverage: vote_average,
                releaseDate: first_air_date,
                sinopse: overview,
                poster: `${image_path500}${poster_path}`,
                backPoster: `${image_path}${backdrop_path}`,
                genres,
                episodes: number_of_episodes,
                seasons: number_of_seasons,
                runtime: episode_run_time,
                voteCount: vote_count
            }
            setGenre(movie.genres);
            setMovie(movie);
            setCreated(movie.created[0].name);

            const network = {
                name: movie.networks[0].name,
            }
            setNetworks(network);

            let release = movie.releaseDate;
            let splitStr = release.split("-");
            let replaceStr = splitStr.reverse();
            let releaseDta = replaceStr.join("/");
            setReleaseDate(releaseDta);
            setReleaseDateY(splitStr[2])
        })
        
    }, [id])

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
                    <span className="movie-release-date">{releaseDateY}</span>
                    <h2 className="movie-title">{movie.name}</h2>
                    <span className="runtime">
                        <img src={timer} alt={movie.name}/>
                        {`${movie.runtime} min`}
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

                    <li>
                        <h3>Criado por</h3>
                        {created}
                    </li>

                    <li>
                        <h3>Total de Episódios</h3>
                        <ul>
                            <li>
                                {movie.episodes !== 1 ? `${movie.episodes} episódios` : `${movie.episodes} episódio`}
                            </li>
                            <li>
                                {movie.seasons !== 1 ? `/ ${movie.seasons} temporadas` : `/ ${movie.seasons} temporada`}
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3>Emissora</h3>
                        {networks.name}
                    </li>

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

                        {<SimilarTv id={id}/>}
                    </div>

                    <div className="movie-cast" >
                        <h2>Elenco Principal</h2>

                        {<TvCast id={id}/>}
                    </div>

                    <div className="trailer">
                        <h2>Assista ao trailer</h2>

                        <TvTrailers id={id} img={`${image_path}${movie.backPoster}`}/>
                        
                    </div>
                </div>

        </div>
    );
}