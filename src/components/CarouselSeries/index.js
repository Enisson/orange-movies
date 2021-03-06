import { useEffect, useRef, useState } from "react";
import { apikey } from "../../config/Key";
import './styles.css';

import arrow from '../../assets/icons/arrow.png';
import arrowLeft from '../../assets/icons/ArrowLeft.png';
import { Link } from "react-router-dom";


export default function CarouselSeries() {

    const [movieList, setMovieList] = useState([]);
    const carousel = useRef(null);
    const leftArrow = useRef(null);
    const rightArrow = useRef(null);
    const count = useRef(0);

    const image_path = "https://image.tmdb.org/t/p/w500";

    useEffect( ()=> {
        fetch(`
        https://api.themoviedb.org/3/tv/popular?api_key=${apikey}&language=pt-BR&page=1`)
        .then(response => response.json())
        .then(data => setMovieList(data.results));

        count.current = 0;    

        if(count.current <= 0) {
            leftArrow.current.style.display = 'none';
        }

    }, [] );

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;   
        
        count.current = count.current -1;
        
        if(count.current <= 0) {
            leftArrow.current.style.display = 'none';
        }

        if(count.current <= 5) {
            rightArrow.current.style.display = 'block';

        }
    }



    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;

        count.current = count.current +1;


        if(window.innerWidth < 500){ 
            if(count.current >= 6) {
                rightArrow.current.style.display = 'none';
            }
    
            if(count.current >= 1) {
                leftArrow.current.style.display = 'block';
    
            }
    } else {
    if(count.current >= 3) {
        rightArrow.current.style.display = 'none';
    }

    if(count.current >= 1) {
        leftArrow.current.style.display = 'block';

    }
}
    }

    return(
        <div className="popular-tv-container">      
            <div className="carousel" ref={carousel}>
                {movieList.map( movie => {

                    const genre = [
                        {id:28, name:"A????o"},
                        {id:27, name:"Terror"},
                        {id:16, name:"Anima????o"},
                        {id:12, name:"Aventura"},
                        {id:35, name:"Com??dia"},
                        {id:80, name:"Crime"},
                        {id:99, name:"Document??rio"},
                        {id:18, name:"Drama"},
                        {id:10751, name:"Fam??lia"},
                        {id:14, name:"Fantasia"},
                        {id:36, name:"Hist??ria"},
                        {id:10402, name:"M??sica"},
                        {id:9648, name:"Mist??rio"},
                        {id:10749, name:"Romance"},
                        {id:878, name:"Fic????o cient??fica"},
                        {id:10770, name:"Cinema TV"},
                        {id:53, name:"Thriller"},
                        {id:10752, name:"Guerra"},
                        {id:37, name:"Faroeste"},
                    ]

                    const {id, name, poster_path, vote_average, first_air_date, genre_ids} = movie;

                    let moviePop = vote_average;
                    let strMovie = moviePop.toFixed(1);
                    let firstN = strMovie.slice(0,1);
                    let lastN = strMovie.slice(-1);
                    let movieConcat = `${firstN}.${lastN}`;
                    let moviePopularity = parseFloat(movieConcat);

                    let className = "movie-popularity"

                    if(moviePopularity <= 5) {
                        className = "movie-less";
                    };
                    if (moviePopularity >= 7) {
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
                        <span className={className}>{moviePopularity}</span>
                    </div>
                    );
                })}
            </div>

            <div className="buttons">
                
                <button ref={count} onClick={handleLeftClick} className="arrow-left">
                    <img ref={leftArrow}  src={arrowLeft} alt="arrow icon" />
                </button>
                <button ref={count}  onClick={handleRightClick} className="arrow-right">
                    <img ref={rightArrow}  src={arrow} alt="arrow icon" />
                </button>                
            </div>
        </div>
    );
}