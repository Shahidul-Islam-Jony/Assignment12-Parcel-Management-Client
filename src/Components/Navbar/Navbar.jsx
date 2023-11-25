import { Link, NavLink } from "react-router-dom";
import '../../../src/index.css'
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);
    // console.log(user);

    const links = <div className="flex flex-col gap-3 lg:flex-row md:gap-6 text-lg font-medium">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>

    </div>

    const handleLogout = () => {
        logout()
            .then(result => {
                console.log(result);
                toast.success('Logout Successful !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="py-4 flex justify-between items-center bg-base-100">
                <div className="flex items-center">
                    <div className="drawer z-50 w-10 lg:hidden">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer" className="drawer-button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-300 text-base-content">
                                {/* Sidebar content here */}
                                {links}

                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <img src="/logo.jpg" className="w-10 h-10 md:w-20 md:h-16" alt="" />
                        <p className="text-xl md:text-3xl font-bold text-blue-800"><span className="text-red-600">P</span>arcel <span className="text-red-600">P</span>oint</p>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="">
                    {
                        user ? <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                {/* <p className="text-lg font-medium">{user.displayName}</p> */}

                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={user.photoURL} title={user.displayName} />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-50 p-2 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52 font-medium">
                                        {/* profile pic link added here*/}
                                    </ul>
                                </div>


                            </div>
                            <button onClick={handleLogout} className="btn btn-outline capitalize w-28 text-xl font-semibold text-blue-800">Logout</button>
                        </div> :
                            <Link to='/login' className="btn btn-outline capitalize w-28 text-xl font-semibold text-blue-800">Login</Link>
                    }
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Navbar;