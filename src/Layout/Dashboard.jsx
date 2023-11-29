import { NavLink, Outlet } from "react-router-dom";
import useSingleUser from "../hooks/useSingleUser";


const Dashboard = () => {
    const { data: user } = useSingleUser();
    // console.log(user);
    return (
        <div className="flex w-11/12 mx-auto">
            {/* dashboard side bar */}
            <div className="w-96 bg-blue-200 min-h-screen">
                <ul className="md:mt-8 mt-2 rounded-box">
                    {
                        user?.type === 'user' && <div className="flex flex-col gap-4">
                            {/* user panel */}
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/bookParcel'>Book a Parcel</NavLink>
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/myParcel'>My Parcels</NavLink>
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='myProfile'>My Profile</NavLink>
                        </div>
                    }

                    {
                        user?.type === 'admin' && <div className="flex flex-col gap-4">
                            {/* Admin panel */}
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/statistics'>Statistics</NavLink>
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/allParcels'>All Parcels</NavLink>
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/allDelivaryMen'>All DelivaryMen</NavLink>
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/allUsers'>All Users</NavLink>
                        </div>
                    }

                    {
                        user?.type === 'deliveryMen' && <div className="flex flex-col gap-4">
                            {/* Admin panel */}
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/myDeliveryList'>My Delivery List</NavLink>
                            <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/dashboard/myReviews'>My Reviews</NavLink>

                        </div>
                    }



                    {/* Common Route */}
                    <div className="divider my-10"></div>
                    <div className="flex flex-col gap-4">
                        <NavLink className="bg-white py-1 pl-4 md:mx-2 rounded-lg text-lg font-medium hover:bg-gray-300" to='/'>Home</NavLink>
                    </div>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;