import user1 from '../../../../src/assets/images/user2.jpg'
import user2 from '../../../../src/assets/images/user2.png'
import user3 from '../../../../src/assets/images/user4.jpg'
import user4 from '../../../../src/assets/images/user5.jpg'
import user5 from '../../../../src/assets/images/user7.jpg'

const TopDeliveryMan = () => {

    return (
        <div>
            <h2 className="text-4xl text-center my-20 text-blue-800 font-medium">--- Top Delivery Man ---</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-28 md:ml-10 mb-16">
                <div className="mb-20">
                    <div className="md:w-96 h-96 relative bg-blue-200 border-l-8 border-b-4 rounded-md border-blue-600">
                        <img className="w-52 h-52 absolute left-20 -top-12 border-t-8 border-l-8 border-blue-500 shadow-black shadow-lg rounded-full" src={user1} alt="" />
                        <div className="pt-48 pl-10">
                            <p>Name: Rahim</p>
                            <p>address: Khulna</p>
                            <p>Num: 01475484484</p>
                        </div>
                    </div>
                </div>
                <div className="mb-20">
                    <div className="md:w-96 h-96 relative bg-blue-200 border-l-8 border-b-4 rounded-md border-blue-600">
                        <img className="w-52 h-52 absolute left-20 -top-12 border-t-8 border-l-8 border-blue-500 shadow-black shadow-lg rounded-full" src={user2} alt="" />
                        <div className="pt-48 pl-10">
                            <p>Name: karim</p>
                            <p>address: Rongpur</p>
                            <p>Num: 01475484484</p>
                        </div>
                    </div>
                </div>
                <div className="mb-20">
                    <div className="md:w-96 h-96 relative bg-blue-200 border-l-8 border-b-4 rounded-md border-blue-600">
                        <img className="w-52 h-52 absolute left-20 -top-12 border-t-8 border-l-8 border-blue-500 shadow-black shadow-lg rounded-full" src={user3} alt="" />
                        <div className="pt-48 pl-10">
                            <p>Name: Ali</p>
                            <p>address: Syllet</p>
                            <p>Num: 01475484484</p>
                        </div>
                    </div>
                </div>
                <div className="mb-7">
                    <div className="md:w-96 h-96 relative bg-blue-200 border-l-8 border-b-4 rounded-md border-blue-600">
                        <img className="w-52 h-52 absolute left-20 -top-12 border-t-8 border-l-8 border-blue-500 shadow-black shadow-lg rounded-full" src={user4} alt="" />
                        <div className="pt-48 pl-10">
                            <p>Name: Sanjoy</p>
                            <p>address: Dhaka</p>
                            <p>Num: 01475484484</p>
                        </div>
                    </div>
                </div>
                <div className="mb-7">
                    <div className="md:w-96 h-96 relative bg-blue-200 border-l-8 border-b-4 rounded-md border-blue-600">
                        <img className="w-52 h-52 absolute left-20 -top-12 border-t-8 border-l-8 border-blue-500 shadow-black shadow-lg rounded-full" src={user5} alt="" />
                        <div className="pt-48 pl-10">
                            <p>Name: Shanto</p>
                            <p>address: Rajshahi</p>
                            <p>Num: 01475484484</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopDeliveryMan;