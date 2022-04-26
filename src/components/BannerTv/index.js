import { useEffect, useState } from 'react';
import { apikey } from '../../config/Key';
import './styles.css';

export default function BannerTv() {

    const [tvList, setTvList] = useState([]);
    const [tv, setTv] = useState({});
    
    const image_path = "https://image.tmdb.org/t/p/original";


    useEffect( ()=> {
        fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apikey}&language=pt-BR&page=1`)
        .then (response => response.json())
        .then(data => console.log(data))

    }, [] )

    useEffect( () => {
        const callTv = async () => {
            const randomMovie = await tvList[Math.floor(Math.random() * tvList.length)];

            let date = randomMovie.first_air_date;
            let splitStr = date.split("-");
            let releaseDate = splitStr.slice(0,1);

            const pickMovie = {
                title: randomMovie.name,
                sinopse: randomMovie.overview,
                image: `${image_path}${randomMovie.backdrop_path}`,
                release: releaseDate
            }
            setTv(pickMovie);
        }

        
        callTv();
    }, [tvList] )     

    return (
        <div className='banner-container'>
            <div className='img-container'>
                <img src={tv.image} alt={tv.title} />
            </div>

            <div className='banner-content'>
                <h1>{tv.title}</h1>
                <h2>{tv.sinopse ? tv.sinopse : <p>Humm... Parece que estamos sem a sinopse deste filme no momento :/</p>}</h2>
                <span>{tv.release}</span>
            </div>
        </div>
    );
}