/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [deliveryMens, setDelivaryMens] = useState([]);
    const [parcelId, setParcelId] = useState('');

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['allParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allParcels')
            return res.data;
        }
    })
    console.log(parcels);

    const handleLoadDelivaryMan = async (id) => {
        setParcelId(id);
        // console.log('Parcel Id : ', id);
        // open modal command
        document.getElementById('my_modal_4').showModal()

        axiosSecure.get(`/allUsers/${'deliveryMen'}`)
            .then(res => {
                // console.log(res.data);
                setDelivaryMens(res.data);
            })
    }
    // console.log(deliveryMens);
    console.log(parcelId);

    const handleAssignDeliveryMan = e => {
        e.preventDefault();
        const deliveryManId = e.target.deliveryManId.value;
        const approximateDate = e.target.approximateDate.value;
        console.log(deliveryManId, approximateDate);
        const updateParcel = {
            deliveryManId,
            approximateDate,
            status: 'On The Way'
        }
        axiosSecure.patch(`/updateBooking/${parcelId}`, updateParcel)
            .then(res => {
                console.log(res.data.modifiedCount);
                refetch();
                if (res.data.modifiedCount) {
                    swal("Done!", "Assign Successful", "success")
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

    return (
        <div>
            <div className="my-10">
                <h2 className="text-3xl text-center font-bold">All Parcels</h2>
            </div>
            <div className="overflow-x-auto ml-10">
                <table className="table text-lg">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>User's Name</th>
                            <th>User's Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map(parcel => <tr key={parcel._id}>
                                <td>{parcel.name}</td>
                                <td>{parcel.phoneNumber}</td>
                                <td>{parcel.bookingDate.split('T')[0]}</td>
                                <td>{parcel.requestDate.split('T')[0]}</td>
                                <td>{parcel.price}</td>
                                <td>{parcel.status}</td>
                                <td><button className="btn btn-sm btn-primary" onClick={() => handleLoadDelivaryMan(parcel._id)}>Manage</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* modals */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12">
                    <form onSubmit={handleAssignDeliveryMan} className="form-control w-full ">
                        <label className="label">
                            <span className="text-xl font-medium">Select Deliverymen</span>
                        </label>
                        <select name="deliveryManId" className="select select-bordered text-lg border-blue-600">
                            <option disabled selected>Please select Deliverymen</option>
                            {
                                deliveryMens.map(deliveryMan => <option key={deliveryMan._id} value={deliveryMan._id}>
                                    {deliveryMan.name}
                                </option>)
                            }
                        </select>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-xl font-medium">Approximate Delivery Date</span>
                            </label>
                            <label className="">
                                <input type="date" name="approximateDate" placeholder=" Approximate Delivery Date" className="input w-full input-bordered" required />
                            </label>
                        </div>

                        <div className="flex justify-between mt-7">
                            <input type="submit" value="Assign" className="btn btn-primary w-36 text-lg font-bold hover:bg-slate-400" />
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

export default AllParcels;