import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect } from "react";
import useSingleUser from "../../../../hooks/useSingleUser";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'


const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [userRatings, setUserRatings] = useState([]);
    const { data: user, isLoading } = useSingleUser();
    // console.log(user);

    useEffect(() => {
        axiosSecure.get(`/myRatings/${user?._id}`)
            .then(res => {
                // console.log(res.data);
                if (res.data.length > 0) {
                    setUserRatings(res.data);
                }
            })
    }, [axiosSecure, user?._id])
    console.log(userRatings);

    if (isLoading) {
        return <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="ml-7 lg:ml-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {
                    userRatings.map(userRating => <div key={userRating._id} className="w-80 bg-blue-700 text-white rounded-lg">
                        <div className="flex justify-center pt-7">
                            <img className="w-40 h-40 rounded-full border-4 border-orange-600" src={userRating.image} alt="" />
                        </div>
                        <div className="flex flex-col text-center space-y-2 items-center pt-5">
                            <p className="text-3xl font-medium">{userRating.name}</p>
                            <p className="text-xl">{userRating?.date?.split('T')[0]}</p>
                            <div>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={userRating.rating}
                                    readOnly
                                />
                            </div>
                            <p className="text-lg pl-2 pr-2 pb-8">{userRating.feedback}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyReviews;