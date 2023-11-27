import { useEffect, useState } from "react";
import useGetMyParcel from "../../../hooks/useGetMyParcel";

const MyParcel = () => {
    const { data, isLoading } = useGetMyParcel();
    const [parcels, setParcels] = useState([]);
    useEffect(()=>{
        setParcels(data)
    },[data])
    console.log(parcels);
    const bookingDate = new Date();
    // console.log(bookingDate);

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

    return (
        <div>
            <div className="flex items-center ml-14 my-10">
                <p className="text-xl font-medium mr-3">Filter :</p>
                <select onChange={handleFilter} className="select select-bordered max-w-xs">
                    <option disabled selected>Filter by status</option>
                    <option value='pending'>Pending</option>
                    <option value="delivered">Delivered</option>
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
                                    <p>Requested Delivary : {parcel.date.split('T')[0]}</p>
                                    <p>Approximate Delivary : </p>
                                    <p>Booking Date : {bookingDate.toDateString()} </p>
                                </td>
                                <td>Delivary Men ID</td>
                                <td className={parcel.status === 'delivered' ? 'text-green-600 font-bold' : ''}>{parcel.status}</td>
                                <td>
                                    {
                                        parcel.status === 'pending' && <div className="flex flex-col gap-2">
                                            <button className="btn btn-sm btn-primary">Update</button>
                                            <button className="btn btn-sm btn-primary">Cancel</button>
                                        </div>
                                    }
                                    {
                                        parcel.status === 'delivered' && <div>
                                            <button className="btn btn-md btn-primary">Review</button>
                                        </div>
                                    }
                                </td>
                                <td><button className="btn btn-md btn-primary">Pay</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcel;