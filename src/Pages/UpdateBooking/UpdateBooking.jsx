/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";
import useGetMyParcel from "../../hooks/useGetMyParcel";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const UpdateBooking = () => {
    const { id } = useParams();
    // console.log(id);
    const { data, isLoading } = useGetMyParcel();
    const parcel = data?.find(parcel => parcel._id === id);
    // console.log(parcel);
    const prevDate = parcel?.date.split('T')[0];
    // console.log(prevDate);
    const { user } = useContext(AuthContext)
    const [price, setPrice] = useState(0);
    const axiosPublic = useAxiosPublic();

    if (isLoading) {
        return <div className="flex justify-center mt-28"><span className="loading loading-spinner loading-lg"></span></div>
    }

    const handleUpdateParcel = e => {
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
            status: 'pending'
        }

        axiosPublic.patch(`/modifyParcel/${id}`, parcel)
            .then(res => {
                console.log(res);
                toast.success('Booking Update Successful !', {
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
        <div>
            <div className="text-center my-10 text-3xl font-semibold">
                <h2>Update Bookings</h2>
            </div>
            <form onSubmit={handleUpdateParcel}>
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
                                <input type="number" defaultValue={parcel.phoneNumber} name="phone" placeholder="Type your phone number" className="input w-full input-bordered" required />
                            </label>
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Parcel Type</span>
                            </label>
                            <label className="">
                                <input type="text" name="parcelType" defaultValue={parcel.parcelType} placeholder="Parcel type" className="input w-full input-bordered" required />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-7">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Reciever's Name</span>
                            </label>
                            <label className="">
                                <input type="text" name="recieverName" defaultValue={parcel.recieverName} placeholder="Type reciever name" className="input w-full input-bordered" required />
                            </label>
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Receiver's Phone Number</span>
                            </label>
                            <label className="">
                                <input type="number" name="recieverPhone" defaultValue={parcel.recieverPhone} placeholder="Reciever phone number" className="input w-full input-bordered" required />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-7">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Parcel Delivery Address</span>
                            </label>
                            <label className="">
                                <input type="text" name="address" defaultValue={parcel.address} placeholder="Type reciever address" className="input w-full input-bordered" required />
                            </label>
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Requested Delivery Date</span>
                            </label>
                            <label className="">
                                <input type="date" name="date" defaultValue={prevDate} placeholder=" Requested Delivery Date" className="input w-full input-bordered" required />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-7">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Delivery Address Latitude</span>
                            </label>
                            <label className="">
                                <input type="text" name="addressLatitude" defaultValue={parcel.addressLatitude} placeholder="i.e 21.121365496" className="input w-full input-bordered" required />
                            </label>
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Delivery Address longitude</span>
                            </label>
                            <label className="">
                                <input type="text" name="addressLongitude" defaultValue={parcel.addressLongitude} placeholder="i.e 21.121365496" className="input w-full input-bordered" required />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-7">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Parcel Weight</span>
                            </label>
                            <label className="">
                                <input type="number" name="weight" defaultValue={parcel.weight} onChange={handleCalculatePrice} placeholder="Parcel weight" className="input w-full input-bordered" required />
                            </label>
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Price</span>
                            </label>
                            <label className="">
                                <input type="number" name="price" value={price ? price : parcel.price} placeholder="Price" readOnly className="input w-full input-bordered" />
                            </label>
                        </div>
                    </div>

                    <input type="submit" value="Update" className="btn bg-primary w-full mt-8 text-white text-xl capitalize" />
                </div>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default UpdateBooking;