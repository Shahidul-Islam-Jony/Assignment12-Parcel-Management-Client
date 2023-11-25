import Banner from "../../Components/Banner/Banner";
import Footer from "../../Components/Shared/Footer/Footer";
import Navbar from "../../Components/Shared/Navbar/Navbar";


const Home = () => {
    return (
        <div className="w-11/12 mx-auto">
           <Navbar></Navbar>
           <Banner></Banner>
           <Footer></Footer>
        </div>
    );
};

export default Home;