import { useEffect, useState } from 'react';
import { apikey } from '../../config/Key';
import './styles.css';

export default function Banner() {

    const [movieList, setMovieList] = useState([]);
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true)
    
    const image_path = "https://image.tmdb.org/t/p/original";


    useEffect( ()=> {
        const fetchData = async () => {
            await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=pt-BR&page=1`)
            .then(Response => Response.json())
            .then(data => setMovieList(data.results))
        }
        fetchData();
        setLoading(false);

    }, [] )

    useEffect( () => {
        const callMovie = async () => {
            const randomMovie = await movieList[Math.floor(Math.random() * movieList.length)];

            let date = randomMovie.release_date;
            let splitStr = date.split("-");
            let releaseDate = splitStr.slice(0,1);

            const pickMovie = {
                title: randomMovie.title,
                sinopse: randomMovie.overview,
                image: `${image_path}${randomMovie.backdrop_path}`,
                release: releaseDate
            }
            setMovie(pickMovie);
        }

        
        callMovie();
    }, [movieList] )
    

    if(!loading) {

        

        return (
            <div className='banner-container'>
                <div className='img-container'>
                    <img src={movie.image} alt={movie.title} />
                </div>
    
                <div className='banner-content'>
                    <h1>{movie.title}</h1>
                    <h2>{movie.sinopse ? movie.sinopse : <p>Humm... Parece que estamos sem a sinopse deste filme no momento :/</p>}</h2>
                    <span>{movie.release}</span>
                </div>
            </div>
        );
    }
}