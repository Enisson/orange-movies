import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BannerTv from "../../components/Banner";
import { apikey } from "../../config/Key";

import './styles.css';


export default function Tv() {

    const [movies, setMovies] = useState([]);
    const image_path = "https://image.tmdb.org/t/p/w500";


    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => {
            setMovies(data.results)
        });
    }, [] );

    return (
        <div>
            <BannerTv />
            <div className="movies-container"> 
            <div className="filter">
                <form>
                    <label>Ordenar por</label>
                    <select  name="movies">
                        <option value="Maior popularidade">Maior popularidade</option>
                        <option value="lançamento">lançamento</option>
                        <option value="Melhor avaliação">Melhor avaliação</option>
                    </select>
                </form>
                <div className="filter-genrer">
                    <h2>Gêneros</h2>
                    <ul className="filter-genrer-list">
                        <li>Animação</li>
                        <li>Aventura</li>
                        <li>Ação</li>
                        <li>Cinema Tv</li>
                        <li>Comédia</li>
                        <li>Crime</li>
                        <li>Documentário</li>
                        <li>Drama</li>
                        <li>Família</li>
                        <li>Fantasia</li>
                        <li>Faroeste</li>
                        <li>Sci-Fi</li>
                        <li>Guerra</li>
                        <li>História</li>
                        <li>Mistério</li>
                        <li>Música</li>
                        <li>Romance</li>
                        <li>Terror</li>
                        <li>Thriller</li>
                    </ul>
                </div>
            </div>     
            <div className="carousel" >
                {movies.map( movie => {

                    const genre = [
                        {id:28, name:"Ação"},
                        {id:27, name:"Terror"},
                        {id:16, name:"Animação"},
                        {id:12, name:"Aventura"},
                        {id:35, name:"Comédia"},
                        {id:80, name:"Crime"},
                        {id:99, name:"Documentário"},
                        {id:18, name:"Drama"},
                        {id:10751, name:"Família"},
                        {id:14, name:"Fantasia"},
                        {id:36, name:"História"},
                        {id:10402, name:"Música"},
                        {id:9648, name:"Mistério"},
                        {id:10749, name:"Romance"},
                        {id:878, name:"Ficção científica"},
                        {id:10770, name:"Cinema TV"},
                        {id:53, name:"Thriller"},
                        {id:10752, name:"Guerra"},
                        {id:37, name:"Faroeste"},
                    ]

                    const {id, name, poster_path, genre_ids, vote_average,  first_air_date} = movie;
                    
                    let moviePop = vote_average;

                    let className = "movie-popularity"

                    if(moviePop <= 5) {
                        className = "movie-less";
                    };
                    if (moviePop >= 7) {
                        className = "movie-high";
                    };

                    let date = first_air_date;
                    let splitStr = date.split("-");
                    let releaseDate = splitStr.slice(0,1);

                    let movieL;
                    genre.map(item => {
                        if(item.id === genre_ids[0]){
                            movieL = item.name;
                        }
                    })
                    
                    return (                    
                    <div className="item" key={id}>
                        <Link to={`/details/movie/${id}`}>
                            <img src={`${image_path}${poster_path}`} alt={name} />
                        </Link>
                        <span className="release">{releaseDate}</span>
                        <span className="genre">{movieL}</span>
                        <h2 className="movie-title">{movie.name}</h2>
                        <span className={className}>{vote_average}</span>
                        
                    </div>
                    );
                })}
            </div>
            </div>
        </div>
    );
}