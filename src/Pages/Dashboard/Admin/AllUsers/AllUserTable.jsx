
import PropTypes from "prop-types"
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import swal from "sweetalert";

const AllUserTable = ({ user }) => {
    const axiosSecure = useAxiosSecure();
    const [totalBooked, setTotalBooked] = useState(0);
    axiosSecure.get(`/myParcel?email=${user.email}`)
        .then(res => {
            // console.log(res.data);
            const usersAllBooked = res.data;
            setTotalBooked(usersAllBooked.length)
        })

    const handleMakeDeliveryMen = async (id) => {
        console.log(id);
        const modifyUser = {
            type: 'deliveryMen',
            totalDelivery: 0,
            ratingGivenUser: 0,
            ratings: 0,
            totalRating: 0,
            averageRating: 0
        }
        await axiosSecure.patch(`/modifyUser/${id}`, modifyUser)
            .then(res => {
                console.log(res.data);
                swal("Done!", "Now user is a delivery Men", "success")
            })
    }
    const handleMakeAdmin = async (id) => {
        console.log(id);
        await axiosSecure.patch(`/modifyUser/${id}`, { type: 'admin' })
            .then(res => {
                console.log(res.data);
                swal("Done!", "Now user is an Admin", "success")
            })
    }

    return (
        <div className="overflow-x-auto">
            <table className="table text-lg">
                {/* head */}
                <thead>
                    <tr className="text-lg">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="w-48">{user.name}</td>
                        <td className="w-56">{user.phoneNumber}</td>
                        <td className="w-72">{totalBooked}</td>
                        <td className="w-64">total amount</td>
                        <td className="flex flex-col gap-2">
                            <button onClick={() => handleMakeDeliveryMen(user._id)} className="btn btn-sm w-40 btn-primary">Make Delivery Man</button>
                            <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-sm w-40 btn-primary">Make Admin</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

AllUserTable.propTypes = {
    user: PropTypes.object
}

export default AllUserTable;