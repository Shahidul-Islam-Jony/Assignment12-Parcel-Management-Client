import { useEffect, useState } from "react";
import useGetMyParcel from "../../../../hooks/useGetMyParcel";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyParcel = () => {
    const { data, isLoading, refetch } = useGetMyParcel();
    const [parcels, setParcels] = useState([]);
    const axiosPublic = useAxiosPublic();
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
        console.log(id);

        Swal.fire({
            title: "Are you sure you want to cancel you parcel?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No",
            confirmButtonText: "Yes!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/modifyParcel/${id}`, { status: 'cancelled' })
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
                        <tr>
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
                                <td className={parcel.status === 'delivered' ? 'text-green-600 font-bold' : '' || parcel.status === 'cancel' ? 'text-red-500 font-bold' : ''}>{parcel.status}</td>
                                <td>
                                    {
                                        parcel.status === 'pending' && <div className="flex flex-col gap-2">
                                            <Link to={`/dashboard/updateBooking/${parcel._id}`} className={`btn btn-sm btn-primary ${parcel.status !== 'pending' ? 'btn-disabled' : ''}`}>Update</Link>
                                            <button onClick={() => handleCancelParcel(parcel._id)} className="btn btn-sm btn-primary">Cancel</button>
                                        </div>
                                    }
                                    {
                                        parcel.status === 'delivered' && <div>
                                            <button className="btn btn-md btn-primary">Review</button>
                                        </div>
                                    }
                                </td>
                                <td><button className={`btn btn-md btn-primary ${parcel.status === 'cancel' && 'btn-disabled'}`}>Pay</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyParcel;