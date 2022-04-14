import './styles.css';

import actress from '../../assets/actors/actress.png';
import trailer from '../../assets/batman.png';
import TopActors from '../TopActors';

export default function Newsletter() {
    return (
        <div className='newsletter-container'>

            <h1>Notícias</h1>

            <div className='newsletter'>

                <div className='top-actor-actress__container'>

                        <h2>Top atores e atrizes</h2>
                        
                        <TopActors />
                </div>
                <div className='trailers-container'>
                    <h2>Trailers</h2>
                    <div className='trailers'>
                        <div className='first-trailer'>
                            <img src={trailer} alt="trailer" />
                            <div>
                                <h4>Batman</h4>
                                <span>Após a perda de seus pais, Bruce Wayne...</span>
                                <p>Bruce Wayne é um jovem bilionário da cidade de Gotham City, Nova Jersey, que também age secretamente como o vigilante noturno Batman após o assassinato dos seus pais.</p>
                                <button>Ver mais</button>
                            </div>
                        </div>
                        <div className='more-trailers'>
                            <div className='trailer'>
                                <img src={trailer} alt="trailer" />
                                <h4>Batman</h4>
                                <span>Após a perda de seus pais, Bruce Wayne...</span>
                            </div>
                            <div className='trailer'>
                                <img src={trailer} alt="trailer" />
                                <h4>Batman</h4>
                                <span>Após a perda de seus pais, Bruce Wayne...</span>
                            </div>
                            <div className='trailer'>
                                <img src={trailer} alt="trailer" />
                                <h4>Batman</h4>
                                <span>Após a perda de seus pais, Bruce Wayne...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}