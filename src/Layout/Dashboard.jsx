import { Link, NavLink, Outlet } from "react-router-dom";
import useSingleUser from "../hooks/useSingleUser";


const Dashboard = () => {
    const { data: user, isLoading } = useSingleUser();
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