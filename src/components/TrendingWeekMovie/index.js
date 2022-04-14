import { useEffect, useRef, useState } from "react";
import { apikey } from "../../config/Key";
import './styles.css';

import arrow from '../../assets/icons/arrow.png';
import arrowLeft from '../../assets/icons/ArrowLeft.png';


export default function TrendingWeekMovie() {

    const [movieList, setMovieList] = useState([]);
    const carousel = useRef(null);
    const leftArrow = useRef(null);
    const rightArrow = useRef(null);
    const count = useRef(0);

    const image_path = "https://image.tmdb.org/t/p/w500";

    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apikey}`)
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

        if(count.current <= 2) {
            rightArrow.current.style.display = 'block';

        }
    }



    const handleRightClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft += carousel.current.offsetWidth;

        count.current = count.current +1;


        if(count.current >= 3) {
            rightArrow.current.style.display = 'none';
        }

        if(count.current >= 1) {
            leftArrow.current.style.display = 'block';

        }
    }

    return(
        <div className="trending-container">      
            <div className="carousel" ref={carousel}>
                {movieList.map( movie => {

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

                    
                    const {id, title, poster_path, vote_average, release_date,  genre_ids} = movie;
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

                    
                        let date = release_date;
                        let splitStr = date.split("-");
                        let releaseDate = splitStr.slice(0,1);
                    


                    let movieL;
                    genre.map((item, index) => {
                        if(item.id === genre_ids[0]){
                            movieL = item.name;
                        }
                        return (
                            index
                        )
                    })
                    
                    
                    return (                    
                    <div className="item" key={id}>
                        <img src={`${image_path}${poster_path}`} alt={title} />
                        <span className="release">{releaseDate}</span>
                        <span className="genre">{movieL}</span>
                        <h2 className="movie-title">{title}</h2>
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