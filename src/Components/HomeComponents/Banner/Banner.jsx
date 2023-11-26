import bannerImg from '../../../assets/images/banner1.jpg'
const Banner = () => {
    return (
        <div className='z-10'>
            <div className='relative'>
                <img src={bannerImg} className='w-full h-screen md:h-[600px]' alt="" />
                <div className='absolute top-1/3 md:left-1/4 text-center bg-blue-400 lg:w-[600px] rounded-md'>
                    <h2 className='bg-blue-800 text-white uppercase p-4 rounded-t-md'>Parcel your products safely by our services</h2>
                    <div className='flex p-10'>
                        <div className="join w-full">
                            <input type='text' name='search' className="input input-bordered join-item w-full" placeholder="search" />
                            <input type="submit" className='btn join-item bg-orange-500 text-white text-lg' value="Search" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;