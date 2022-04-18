import { useState } from "react";
import Banner from "../../components/Banner";
import CarouselPopular from "../../components/CarouselPopular";
import CarouselSeries from "../../components/CarouselSeries";
import Newsletter from "../../components/Newsletter";
import NowPlaying from "../../components/NowPlaying";
import TrendingWeekMovie from "../../components/TrendingWeekMovie";
import TrendingWeekSeries from "../../components/TrendingWeekSeries";



import './styles.css';

export default function Home() {

    const [isMovie, setIsMovie] = useState(true);
    const [isTvShow, setIsTvShow] = useState(true);


    return (
        <div className="home">
            <Banner />
            <div className="title-container">
                <div className="title">
                    <h1>Os mais populares</h1>
                    <span>ver mais</span>
                </div>
                <div className="movie-link">
                    <span className={`gener ${isMovie ? "gener-active" : "gener"}`} onClick={()=> setIsMovie(true)}>Filmes</span>
                    <span className={`gener ${!isMovie ? "gener-active" : "gener"}`} onClick={()=> setIsMovie(false)}>Séries</span>
                </div>
            </div>

            {isMovie ? <CarouselPopular /> : <CarouselSeries />}

            <div className="title-container">
                <div className="title">
                    <h1>Files em cartaz</h1>
                    <span>ver mais</span>
                </div>
                
            </div>
            
            <NowPlaying />

            <div className="title-container">
                <div className="title">
                    <h1>Tendências da semana</h1>
                    <span>ver mais</span>
                </div>
                <div className="movie-link">
                    <span className={`gener ${isTvShow ? "gener-active" : "gener"}`} onClick={()=> setIsTvShow(true)}>Filmes</span>
                    <span className={`gener ${!isTvShow ? "gener-active" : "gener"}`} onClick={()=> setIsTvShow(false)}>Séries</span>
                </div>
            </div>
            
            {isTvShow ? <TrendingWeekMovie /> : <TrendingWeekSeries />}

            <Newsletter />
        </div>
    );
}