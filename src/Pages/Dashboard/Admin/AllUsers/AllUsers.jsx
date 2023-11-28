/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import AllUserTable from "./AllUserTable";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUsers } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers/${'user'}`)
            return res.data;
        }
    })
    // console.log(allUsers);


    return (
        <div>
            <div className="my-10">
                <h2 className="text-3xl text-center font-bold">All users</h2>
            </div>
            <div className="overflow-x-auto ml-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th className="w-48">User's Name</th>
                            <th className="w-56">Phone Number</th>
                            <th className="w-72">Number of user Booked</th>
                            <th className="w-64">Total Spent Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                {
                    allUsers?.map(user => <AllUserTable user={user} key={user._id}></AllUserTable>)
                }
            </div>
        </div>
    );
};

export default AllUsers;