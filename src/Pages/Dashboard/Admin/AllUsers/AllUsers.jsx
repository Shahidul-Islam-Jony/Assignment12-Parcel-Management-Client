/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allUsers } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers/${'user'}`)
            return res.data;
        }
    })
    console.log(allUsers);
    return (
        <div>
            <div className="my-10">
                <h2 className="text-3xl text-center font-bold">All users</h2>
            </div>
            <div className="overflow-x-auto ml-10">
                <table className="table text-lg">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>User's Name</th>
                            <th>Phone Number</th>
                            <th>Number of user Booked</th>
                            <th>Total Spent Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers?.map(user => <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.phoneNumber}</td>
                                <td>num of parcel</td>
                                <td>total amount</td>
                                <td className="flex flex-col gap-2">
                                    <button className="btn btn-sm btn-primary">Make Delivery Man</button>
                                    <button className="btn btn-sm btn-primary">Make Admin</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;