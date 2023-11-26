import Banner from "../../Components/HomeComponents/Banner/Banner";
import Features from "../../Components/HomeComponents/Features/Features";
import Footer from "../../Components/Shared/Footer/Footer";
import Navbar from "../../Components/Shared/Navbar/Navbar";


const Home = () => {
    return (
        <div className="w-11/12 mx-auto">
           <Navbar></Navbar>
           <Banner></Banner>
           <Features></Features>
           <Footer></Footer>
        </div>
    );
};

export default Home;