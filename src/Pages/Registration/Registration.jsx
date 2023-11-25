import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import swal from 'sweetalert';
import { Helmet, HelmetProvider } from "react-helmet-async";
import regImg from '../../assets/images/Registration.jpg'


const Registration = () => {
    const { createUser, updateUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegistration = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photo.value;
        const password = form.password.value;
        // console.log(name,email,photoUrl,password);
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
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)) {
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
                        swal("Done!", "Registration successful", "success")
                        // logout user and navigate to login
                        logout()
                            .then(() => { })
                            .catch(error => console.log(error))
                        navigate('/login');

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
                                        <span className="text-xl font-medium">Photo URL</span>
                                    </label>
                                    <input type="text" name='photo' placeholder="Please give your photo url" className="input rounded-md w-full border-blue-600" required />
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
                        </div>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </HelmetProvider>
    );
};

export default Registration;