/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import useGetMyParcel from "../../../../hooks/useGetMyParcel";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../providers/AuthProvider";

const MyParcel = () => {
    const { data, isLoading, refetch } = useGetMyParcel();
    const [parcels, setParcels] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    console.log(user);
    const [deliveryMensId, setDelivaryMensId] = useState('');
    const date = new Date().toLocaleDateString();
    // console.log(date);

    useEffect(() => {
        setParcels(data)
    }, [data])
    console.log(parcels);

    if (isLoading) {
        return <div className="flex justify-center mt-28"><span className="loading loading-spinner loading-lg"></span></div>
    }

    const handleFilter = e => {
        console.log(e.target.value);
        const value = e.target.value;
        const filteredData = data?.filter(parcel => parcel.status === value)
        setParcels(filteredData);
        console.log(filteredData);
    }

    const handleCancelParcel = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure you want to cancel your parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/modifyParcel/${id}`, { status: 'Cancelled' })
                    .then(res => {
                        console.log(res);
                        refetch();
                        toast.success('Parcel canceled !', {
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
        });
    }

    const handleReviewBtn = (deliveryManId) => {
        // open modal command
        document.getElementById('my_modal_4').showModal()
        setDelivaryMensId(deliveryManId);
    }

    const handleGiveReview = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const deliveryMensId = form.deliveryMensId.value;
        const rating = form.rating.value;
        const feedback = form.feedback.value;
        // console.log(name,image,deliveryMensId,rating,feedback);
        const review = {
            name,
            image,
            deliveryMensId,
            rating,
            date,
            feedback
        }
        console.log(date);
        axiosPublic.post('/userRating', review)
            .then(res => {
                console.log(res.data);
                form.reset()
                if (res.data._id) {
                    toast.success('Review Given Done !', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
    }

    return (
        <div>
            <div className="flex items-center ml-14 my-10">
                <p className="text-xl font-medium mr-3">Filter :</p>
                <select onChange={handleFilter} className="select select-bordered max-w-xs">
                    <option disabled selected>Filter by status</option>
                    <option value='Pending'>Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="On The Way">On The Way</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>



            <div className="overflow-x-auto pl-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>Parcel Type</th>
                            <th>Date</th>
                            <th>Delivary Men ID</th>
                            <th>Booking Status</th>
                            <th>Action</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map(parcel => <tr key={parcel._id}>
                                <th>{parcel.parcelType}</th>
                                <td>
                                    <p>Requested Delivary Date: {parcel?.requestDate.split('T')[0]}</p>
                                    <p>Approximate Delivary Date: {parcel?.approximateDate?.split('T')[0]} </p>
                                    <p>Booking Date : {parcel?.bookingDate.split('T')[0]} </p>
                                </td>
                                <td>{parcel.deliveryManId}</td>
                                <td className={parcel.status === 'Delivered' ? 'text-green-600 font-bold' : '' || parcel.status === 'Cancel' ? 'text-red-600 font-bold' : '' || parcel.status === 'On The Way' ? 'text-blue-400 font-bold' : '' || parcel.status === 'Pending' ? 'text-orange-300 font-bold' : ''}>{parcel.status}</td>
                                <td>
                                    {
                                        parcel.status === 'Pending' && <div className="flex flex-col gap-2">
                                            <Link to={`/dashboard/updateBooking/${parcel._id}`} className={`btn btn-sm btn-primary ${parcel.status !== 'Pending' ? 'btn-disabled' : ''}`}>Update</Link>
                                            <button onClick={() => handleCancelParcel(parcel._id)} className="btn btn-sm btn-primary">Cancel</button>
                                        </div>
                                    }
                                    {
                                        parcel.status === 'Delivered' && <div>
                                            <button onClick={() => handleReviewBtn(parcel?.deliveryManId)} className="btn btn-sm btn-primary">Review</button>
                                        </div>
                                    }
                                </td>
                                <td><button className={`btn btn-sm btn-primary ${parcel.status === 'Cancel' && 'btn-disabled'}`}>Pay</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* modals */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12">
                    <form onSubmit={handleGiveReview} className="form-control w-full ">

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-medium">User's Name</span>
                            </label>
                            <label className="">
                                <input type="text" defaultValue={user.displayName} name="name" className="input w-full input-bordered" required readOnly />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-medium">User's Image</span>
                            </label>
                            <label className="">
                                <input type="text" defaultValue={user.photoURL} name="image" className="input w-full input-bordered" required readOnly />
                            </label>
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Delivery Men's Id</span>
                            </label>
                            <label className="">
                                <input type="text" defaultValue={deliveryMensId} name="deliveryMensId" className="input w-full input-bordered" required readOnly />
                            </label>
                        </div>

                        <label className="label">
                            <span className="text-xl font-medium">Rating</span>
                        </label>
                        <select name="rating" className="select select-bordered text-lg border-blue-600">
                            <option disabled selected>Give Rating</option>
                            <option value='5'>5</option>
                            <option value='4'>4</option>
                            <option value='3'>3</option>
                            <option value='2'>2</option>
                            <option value='1'>1</option>
                        </select>

                        <label className="form-control">
                            <div className="label">
                                <span className="label-text-alt">Feedback</span>
                            </div>
                            <textarea name='feedback' className="textarea textarea-bordered h-24" placeholder="Give your feedback.."></textarea>
                        </label>

                        <div className="flex justify-between mt-7">
                            <input type="submit" value="Submit" className="btn btn-primary w-36 text-lg font-bold hover:bg-slate-400" />
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn w-36 bg-yellow-800 text-white">close</button>
                            </form>
                        </div>
                    </form>
                </div>
            </dialog>

            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyParcel;