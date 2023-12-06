/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allDeliveryMens } = useQuery({
        queryKey: ['alldeliveryMens'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers/${'deliveryMen'}`)
            return res.data;
        }
    })
    // console.log(allDeliveryMens);
    return (
        <div>
            <div className="my-10">
                <h2 className="text-3xl text-center font-bold">All Delivery Man</h2>
            </div>
            <div className="overflow-x-auto ml-10">
                <table className="table text-lg">
                    {/* head */}
                    <thead>
                        <tr className="text-lg">
                            <th>Delivery Man's Name</th>
                            <th>Phone Number</th>
                            <th>Number of parcel delivered</th>
                            <th>Average review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allDeliveryMens?.map(deliveryMen => <tr key={deliveryMen._id}>
                                <td>{deliveryMen.name}</td>
                                <td>{deliveryMen.phoneNumber}</td>
                                <td>num of parcel delivered</td>
                                <td>review</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMen;