import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useState } from "react";
import swal from 'sweetalert';
import { Helmet, HelmetProvider } from "react-helmet-async";
import regImg from '../../assets/images/Registration.jpg'
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Registration = () => {
    const { createUser, updateUser, loginByGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [userType, setUserType] = useState('user');
    console.log();

    const handleRegistration = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;
        const photoUrl = form.photo.value;
        const type = form.type.value;
        const password = form.password.value;
        // console.log(name,email,photoUrl,password,type,phoneNumber);
        if (password.length < 6) {
            toast.error('Password should be 6 character or longer!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/.test(password)) {
            toast.error('Password should have atleast one Capital letter one small letter and one special character !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        // console.log(name,email,photoUrl,password);
        createUser(email, password)
            .then(result => {
                console.log(result);
                updateUser(name, photoUrl)
                    .then(() => {
                        setUserType(type)
                        // set user info in database
                        // console.log('Afer set User type: ',userType);
                        const userInfo = {
                            name,
                            email,
                            phoneNumber,
                            photoUrl,
                            type
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res);
                                if (res.data._id) {
                                    swal("Done!", "Registration successful", "success")
                                }
                            })
                        navigate('/');
                    })
                    .catch(error => {
                        toast.error(`${error}`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        return;
                    })

            })
            .catch(error => {
                toast.error(`${error}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            })
    }


    const handleLoginByGoogle = () => {
        loginByGoogle()
            .then(result => {
                // console.log(result.user.displayName);
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoUrl: result.user.photoURL,
                    type: userType
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res);
                        if (res.data._id) {
                            swal("Done!", "User create successful", "success")
                        }
                    })
                swal("Done!", "Registration successful", "success")
                navigate('/');

            })
            .catch(error => {
                toast.error(`${error}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return;
            })
    }

    return (
        <HelmetProvider>
            <Helmet><title>Parcel Point | Registration</title></Helmet>
            <div className="w-11/12 mx-auto mt-20 text-center">
                <div className="flex mx-auto flex-col gap-4 md:flex-row md:px-4">
                    <div className='w-full lg:w-1/2 mx-auto'>
                        <img src={regImg} alt="" />
                    </div>
                    <div className='w-full lg:w-1/2 mx-auto'>
                        <h1 className="text-5xl font-bold mb-4">Register now!</h1>
                        <div className="rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                            <form onSubmit={handleRegistration}>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Name</span>
                                    </label>
                                    <input type="text" name='name' placeholder="Your name" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="Email" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Phone Number</span>
                                    </label>
                                    <input type="number" name='phoneNumber' placeholder="Your phone number" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Photo URL</span>
                                    </label>
                                    <input type="text" name='photo' placeholder="Please give your photo url" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                {/* user type */}
                                <div className="form-control w-full ">
                                    <label className="label">
                                        <span className="text-xl font-medium">Your Types</span>
                                    </label>
                                    <select name="type" className="select select-bordered text-lg border-blue-600">
                                        <option disabled selected>Please select your type</option>
                                        <option value='user'>User</option>
                                        <option value='deliveryMen'>DeliveryMen</option>
                                    </select>
                                </div>


                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Password</span>
                                    </label>
                                    <input type="password" name='password' placeholder="password" className="input rounded-md w-full border-blue-600" required />
                                </div>
                                <div className="form-control mt-6">
                                    <input className='btn btn-primary capitalize text-xl font-semibold' type="submit" value="Register" />
                                </div>
                                <div className='text-center mt-4'>
                                    <p>Already have account ? Please <Link to='/login' className='font-medium hover:underline text-primary ml-2'>Login</Link></p>
                                </div>
                            </form>
                            <div>
                                <div className="divider">OR</div>
                                <button onClick={handleLoginByGoogle} className='btn btn-outline w-full text-lg border-blue-600 capitalize'><FcGoogle className='text-3xl mr-4'></FcGoogle>Login With Google</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </HelmetProvider>
    );
};

export default Registration;