import Banner from "../../components/Banner";
import CarouselPopular from "../../components/CarouselPopular";

export default function Home() {
    return (
        <div className="home">
            <Banner />
            <CarouselPopular />
            <CarouselPopular />
            <CarouselPopular />
            
            <h1>Home Pag</h1>
        </div>
    );
}