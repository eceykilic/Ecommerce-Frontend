import CarouselHome from "../components/HomePage/CarouselHome";
import ShopCard from "../components/HomePage/ShopCard";
import BestSeller from "../components/HomePage/BestSeller";
import Carousel2 from "../components/HomePage/Carousel2";
import ContainerFluid from "../components/HomePage/ContainerFluid"
import Blog from "../components/HomePage/Blog";


export default function Home() {
    return(
        <>

    <CarouselHome />
    <ShopCard />
    <BestSeller />
    <Carousel2 />
    <ContainerFluid />
    <Blog />
    </>
    )
}