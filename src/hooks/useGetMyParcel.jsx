import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useGetMyParcel = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { data, isLoading } = useQuery({
        queryKey: ['parcel'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/myParcel?email=${user.email}`)
            return res.data;
        }
    })
    // console.log(data);
    return { data, isLoading }
};

export default useGetMyParcel;