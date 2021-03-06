import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import { apikey } from "../../config/Key";
import filter from '../../assets/bxs-filter-alt.svg';

import MoreMovie from "./MoreMovie";

import './styles.css';


export default function Movie() {



    const [movies, setMovies] = useState([]);
    const [moviesList, setMoviesList] = useState([]);
    const pageCount = useRef(0);

    const [valueCHa, setValueCha] = useState();
    const [genreId, setGenreId] = useState();
    const [filterList, setFilterList] = useState('popularity.desc');
    const image_path = "https://image.tmdb.org/t/p/w500";


    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=${filterList}&with_genres=${genreId}&language=pt-BR&page=1`)
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

    }, [filterList, valueCHa, genreId] );

    const loadMovies = () => {
        pageCount.current = pageCount.current + 1;
        setMoviesList( [...moviesList, <MoreMovie page={pageCount.current} genre={genreId} filter={filterList}/>])
    }

    const [btnToggle, setBtnToggle] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [className, setClassName] = useState();


    useEffect(()=>{
        const getWindowWidth = ()=> {
            
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', getWindowWidth)

        if(windowWidth > 800){
            setClassName('filter')
        } else {
            if(windowWidth <= 800 && btnToggle){
                        setClassName('filter')
                    } else {
                        setClassName('filter-close')
                    }
        }
        
        
    },[windowWidth, btnToggle])

    const filterFunciton = () => {
        setBtnToggle(!btnToggle);
        
    }


    return (

        <div>
            <Banner />
            <div className="movies-container"> 
            <span className="filter-button" onClick={filterFunciton}>
                <img src={filter} alt={filter}/>
                <p>Filtrar conteúdo</p>
            </span>
            <div className={`${className}`}>
                <form>
                    <label>Ordenar por</label>
                    <select name="movies" onChange={(e)=> setValueCha(e.target.value)}>
                        <option value="Maior popularidade">Maior popularidade</option>
                        <option value="Melhor avaliação">Melhor avaliação</option>
                    </select>
                </form>
                <div className="filter-genrer">
                    <h2>Gêneros</h2>
                    <ul className="filter-genrer-list" >
                        <li onClick={()=> {setGenreId('16'); setMoviesList([]);}}>
                            Animação
                        </li>
                        <li onClick={()=> {setGenreId('12'); setMoviesList([])}}>
                            Aventura
                        </li>
                        <li onClick={()=> {setGenreId('28'); setMoviesList([])}}>
                            Ação
                        </li>
                        <li onClick={()=> {setGenreId('10770'); setMoviesList([])}}>
                            Cinema Tv
                        </li>
                        <li onClick={()=> {setGenreId('35'); setMoviesList([])}}>
                            Comédia
                        </li>
                        <li onClick={()=> {setGenreId('80'); setMoviesList([])}}>
                            Crime
                        </li>
                        <li onClick={()=> {setGenreId('99'); setMoviesList([])}}>
                            Documentário
                        </li>
                        <li onClick={()=> {setGenreId('18'); setMoviesList([])}}>
                            Drama
                        </li>
                        <li onClick={()=> {setGenreId('10751'); setMoviesList([])}}>
                            Família
                        </li>
                        <li onClick={()=> {setGenreId('14'); setMoviesList([])}}>
                            Fantasia
                        </li>
                        <li onClick={()=> {setGenreId('37'); setMoviesList([])}}>
                            Faroeste
                        </li>
                        <li onClick={()=> {setGenreId('878'); setMoviesList([])}}>
                            Sci-Fi
                        </li>
                        <li onClick={()=> {setGenreId('10752'); setMoviesList([])}}>
                            Guerra
                        </li>
                        <li onClick={()=> {setGenreId('36'); setMoviesList([])}}>
                            História
                        </li>
                        <li onClick={()=> {setGenreId('9648'); setMoviesList([])}}>
                            Mistério
                        </li>
                        <li onClick={()=> {setGenreId('10402'); setMoviesList([])}}>
                            Música
                        </li>
                        <li onClick={()=> {setGenreId('10749'); setMoviesList([])}}>
                            Romance
                        </li>
                        <li onClick={()=> {setGenreId('27'); setMoviesList([])}}>
                            Terror
                        </li>
                        <li onClick={()=> {setGenreId('53'); setMoviesList([])}}>
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

                    const {id, title, poster_path, genre_ids, vote_average, release_date} = movie;
                    
                    let moviePop = vote_average;

                    let className = "movie-popularity"

                    if(moviePop <= 5) {
                        className = "movie-less";
                    };
                    if (moviePop >= 7) {
                        className = "movie-high";
                    };

                    let date = release_date;
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
                            <img src={`${image_path}${poster_path}`} alt={title} />
                        </Link>
                        <span className="release">{releaseDate}</span>
                        <span className="genre">{movieL}</span>
                        <h2 className="movie-title">{movie.title}</h2>
                        <span className={className}>{vote_average}</span>
                        
                    </div>
                    );
                })}
                {moviesList.map(movie => {
                    return <>{movie}</>
                })}
                <button className="loadMore" onClick={loadMovies}>Carregar mais</button>
            </div>
            </div>
        </div>
    );
}