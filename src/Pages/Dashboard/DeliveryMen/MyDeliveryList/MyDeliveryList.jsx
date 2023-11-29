import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useSingleUser from "../../../../hooks/useSingleUser";


const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure();
    const [deliveryParcels, setDeliveryParcels] = useState([]);

    const { data: user } = useSingleUser();

    useEffect(() => {
        axiosSecure.get(`/myDeliveryParcels/${user._id}`)
            .then(res => {
                // console.log(res.data);
                setDeliveryParcels(res.data);
            })
    }, [axiosSecure, user._id])

    console.log(deliveryParcels);

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
                                    <button className="btn btn-sm btn-warning">Cancel</button>
                                    <button className="btn btn-sm btn-primary">Deliver</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;