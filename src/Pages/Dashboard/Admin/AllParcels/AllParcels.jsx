/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['allParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allParcels')
            return res.data;
        }
    })
    console.log(parcels);


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
                            <th>Requested Delivary Date</th>
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
                                <td><button className="btn btn-sm btn-primary">Manage</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllParcels;