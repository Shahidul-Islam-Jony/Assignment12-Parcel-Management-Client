import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSingleUser from "../../../../hooks/useSingleUser";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";


const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure();
    const [deliveryParcels, setDeliveryParcels] = useState([]);

    const { data: user, isLoading, refetch } = useSingleUser();

    useEffect(() => {
        axiosSecure.get(`/myDeliveryParcels/${user?._id}`)
            .then(res => {
                // console.log(res.data);
                setDeliveryParcels(res.data);
            })
    }, [axiosSecure, user?._id])
    console.log(deliveryParcels);

    if (isLoading) {
        return <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>
    }

    const handleCancelParcel = async (id) => {
        const updateParcel = {
            status: 'Cancelled'
        }
        Swal.fire({
            title: "Are you sure you want to cancel parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/updateBooking/${id}`, updateParcel)
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

    const handleDeliveryParcel = async (id) => {
        const updateParcel = {
            status: 'Delivered'
        }
        Swal.fire({
            title: "Is Parcel Delivered?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/updateBooking/${id}`, updateParcel)
                    .then(res => {
                        console.log(res);
                        refetch();
                        toast.success('Parcel Delivered Success !', {
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

    return (
        <div>
            <div className="my-10">
                <h2 className="text-3xl text-center font-bold">My Delivery List</h2>
            </div>
            <div className="overflow-x-auto ml-4">
                <table className="table text-lg">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                            <th>Receivers Address</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryParcels?.map(parcel => <tr key={parcel._id}>
                                <td>
                                    <p>User: {parcel.name}</p>
                                    <p>Reciever: {parcel.recieverName}</p>
                                </td>
                                <td>
                                    <p>User: {parcel.phoneNumber}</p>
                                    <p>Reciever: {parcel.recieverPhone}</p>
                                </td>
                                <td>
                                    <p>Requested : {parcel.requestDate.split('T')[0]}</p>
                                    <p>Approximate : {parcel.approximateDate.split('T')[0]}</p>
                                </td>
                                <td>{parcel.address}</td>
                                <td><button className="btn btn-sm btn-info">View Location</button></td>
                                <td className="flex flex-col gap-2">
                                    <button onClick={() => handleDeliveryParcel(parcel._id)} className={parcel.status === 'Delivered' ? 'btn btn-sm btn-primary btn-disabled' : '' || parcel.status === 'Cancelled' ? 'btn btn-sm btn-disabled' : '' || 'btn btn-primary btn-sm'}>Deliver</button>
                                    <button onClick={() => handleCancelParcel(parcel._id)} className={parcel.status === 'Delivered' ? 'btn btn-sm btn-primary btn-disabled' : '' || parcel.status === 'Cancelled' ? 'btn btn-sm btn-disabled' : '' || 'btn btn-warning btn-sm'}>Cancel</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyDeliveryList;