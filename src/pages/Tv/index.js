import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BannerTv from "../../components/BannerTv";
import { apikey } from "../../config/Key";
import MoreTv from "./MoreTv";

import './styles.css';


export default function Tv() {

    const [movies, setMovies] = useState([]);
    const [tvList, setTvList] = useState([]);
    const pageCount = useRef(0);
    const [valueCHa, setValueCha] = useState();
    const [genreId, setGenreId] = useState();

    const [filterList, setFilterList] = useState('popularity.desc');
    

    const image_path = "https://image.tmdb.org/t/p/w500";


    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apikey}&sort_by=${filterList}&with_genres=${genreId}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => {
            setMovies(data.results)
        });

        pageCount.current = 1;

        const changeValueFunciton = () => {
            switch (valueCHa) {
                case 'Maior popularidade':
                    setFilterList('popularity.desc')
                    break;
                case 'Melhor avaliação':
                    setFilterList('vote_count.desc')
                    break;
                default:
                    setFilterList('popularity.desc')
                    break;
            }
        }

        changeValueFunciton()
    }, [valueCHa, filterList, genreId] );

    const loadTvShow = () => {
        pageCount.current = pageCount.current + 1;
        setTvList( [...tvList, <MoreTv page={pageCount.current} genre={genreId} filter={filterList} />] )
    }

    return (
        <div>
            <BannerTv />
            <div className="movies-container"> 
            <div className="filter">
                <form>
                    <label>Ordenar por</label>
                    <select  name="movies" onChange={(e)=>setValueCha(e.target.value)}>
                        <option value="Maior popularidade">Maior popularidade</option>
                        <option value="Melhor avaliação">Melhor avaliação</option>
                    </select>
                </form>
                <div className="filter-genrer">
                    <h2>Gêneros</h2>
                    <ul className="filter-genrer-list">
                    <li onClick={()=> {setGenreId('16'); setTvList([])}}>
                            Animação
                        </li>
                        <li onClick={()=> {setGenreId('12'); setTvList([])}}>
                            Aventura
                        </li>
                        <li onClick={()=> {setGenreId('28'); setTvList([])}}>
                            Ação
                        </li>
                        <li onClick={()=> {setGenreId('10770'); setTvList([])}}>
                            Cinema Tv
                        </li>
                        <li onClick={()=> {setGenreId('35'); setTvList([])}}>
                            Comédia
                        </li>
                        <li onClick={()=> {setGenreId('80'); setTvList([])}}>
                            Crime
                        </li>
                        <li onClick={()=> {setGenreId('99'); setTvList([])}}>
                            Documentário
                        </li>
                        <li onClick={()=> {setGenreId('18'); setTvList([])}}>
                            Drama
                        </li>
                        <li onClick={()=> {setGenreId('10751'); setTvList([])}}>
                            Família
                        </li>
                        <li onClick={()=> {setGenreId('14'); setTvList([])}}>
                            Fantasia
                        </li>
                        <li onClick={()=> {setGenreId('37'); setTvList([])}}>
                            Faroeste
                        </li>
                        <li onClick={()=> {setGenreId('878'); setTvList([])}}>
                            Sci-Fi
                        </li>
                        <li onClick={()=> {setGenreId('10752'); setTvList([])}}>
                            Guerra
                        </li>
                        <li onClick={()=> {setGenreId('36'); setTvList([])}}>
                            História
                        </li>
                        <li onClick={()=> {setGenreId('9648'); setTvList([])}}>
                            Mistério
                        </li>
                        <li onClick={()=> {setGenreId('10402'); setTvList([])}}>
                            Música
                        </li>
                        <li onClick={()=> {setGenreId('10749'); setTvList([])}}>
                            Romance
                        </li>
                        <li onClick={()=> {setGenreId('27'); setTvList([])}}>
                            Terror
                        </li>
                        <li onClick={()=> {setGenreId('53'); setTvList([])}}>
                            Thriller
                        </li>
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
                        <Link to={`/details/tv/${id}`}>
                            <img src={`${image_path}${poster_path}`} alt={name} />
                        </Link>
                        <span className="release">{releaseDate}</span>
                        <span className="genre">{movieL}</span>
                        <h2 className="movie-title">{movie.name}</h2>
                        <span className={className}>{vote_average}</span>
                        
                    </div>
                    );
                })}

                {tvList.map(tv => {
                    return <>{tv}</>
                })}
                <button className="loadMore" onClick={loadTvShow}>Carregar mais</button>
            </div>
            </div>
        </div>
    );
}