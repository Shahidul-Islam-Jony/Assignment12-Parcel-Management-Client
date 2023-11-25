import Banner from "../../Components/Banner/Banner";
import Navbar from "../../Components/Shared/Navbar/Navbar";


const Home = () => {
    return (
        <div className="w-11/12 mx-auto">
           <Navbar></Navbar>
           <Banner></Banner>
        </div>
    );
};

export default Home;