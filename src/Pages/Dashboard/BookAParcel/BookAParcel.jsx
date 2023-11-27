/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";


const BookAParcel = () => {
    const { user } = useContext(AuthContext);
    const [price, setPrice] = useState(0);
    const axiosPublic = useAxiosPublic();

    const handleBookParcel = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phone.value;
        const parcelType = form.parcelType.value;
        const recieverName = form.recieverName.value;
        const recieverPhone = form.recieverPhone.value;
        const address = form.address.value;
        const date = form.date.value;
        const addressLatitude = form.addressLatitude.value;
        const addressLongitude = form.addressLongitude.value;
        const weight = form.weight.value;
        const price = form.price.value;

        const parcel = {
            name,
            email,
            phoneNumber,
            parcelType,
            recieverName,
            recieverPhone,
            address,
            date,
            addressLatitude,
            addressLongitude,
            weight,
            price,
            status:'pending'
        }

        axiosPublic.post('/bookAParcel', parcel)
            .then(res => {
                // console.log(res);
                toast.success('Parcel Booked Successful !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                if(res.data._id){
                    form.reset();
                    setPrice(0);
                }
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

    const handleCalculatePrice = e => {
        // console.log(e.target.value);
        const weight = parseInt(e.target.value)
        // console.log(weight);
        if (weight <= 1) {
            setPrice(50);
        }
        else if (weight <= 2) {
            setPrice(100);
        }
        else if (weight > 2) {
            setPrice(150);
        }
        else {
            setPrice(0);
        }
    }


    return (
        <div className='pb-5'>
            <div className="w-11/12 mx-auto bg-[#F3F3F3] min-h-screen py-10 rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Book A Parcel</h2>
                <form onSubmit={handleBookParcel}>
                    <div className="w-4/5 mx-auto">

                        <div className="flex flex-col md:flex-row gap-7">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Name</span>
                                </label>
                                <label className="">
                                    <input type="text" defaultValue={user.displayName} readOnly name="name" className="input w-full input-bordered" />
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Email</span>
                                </label>
                                <label className="">
                                    <input type="email" defaultValue={user.email} readOnly name="email" className="input w-full input-bordered" />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-7">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Phone Number</span>
                                </label>
                                <label className="">
                                    <input type="number" name="phone" placeholder="Type your phone number" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Parcel Type</span>
                                </label>
                                <label className="">
                                    <input type="text" name="parcelType" placeholder="Parcel type" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-7">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Reciever's Name</span>
                                </label>
                                <label className="">
                                    <input type="text" name="recieverName" placeholder="Type reciever name" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Receiver's Phone Number</span>
                                </label>
                                <label className="">
                                    <input type="number" name="recieverPhone" placeholder="Reciever phone number" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-7">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Parcel Delivery Address</span>
                                </label>
                                <label className="">
                                    <input type="text" name="address" placeholder="Type reciever address" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Requested Delivery Date</span>
                                </label>
                                <label className="">
                                    <input type="date" name="date" placeholder=" Requested Delivery Date" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-7">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Delivery Address Latitude</span>
                                </label>
                                <label className="">
                                    <input type="text" name="addressLatitude" placeholder="i.e 21.121365496" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Delivery Address longitude</span>
                                </label>
                                <label className="">
                                    <input type="text" name="addressLongitude" placeholder="i.e 21.121365496" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-7">
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Parcel Weight</span>
                                </label>
                                <label className="">
                                    <input type="number" name="weight" onChange={handleCalculatePrice} placeholder="Parcel weight" className="input w-full input-bordered" required/>
                                </label>
                            </div>
                            <div className="form-control w-full md:w-1/2">
                                <label className="label">
                                    <span className="label-text text-xl font-medium">Price</span>
                                </label>
                                <label className="">
                                    <input type="number" name="price" defaultValue={price ? price : ''} placeholder="Price" readOnly className="input w-full input-bordered" />
                                </label>
                            </div>
                        </div>

                        <input type="submit" value="Book" className="btn bg-primary w-full mt-8 text-white text-xl capitalize" />
                    </div>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default BookAParcel;