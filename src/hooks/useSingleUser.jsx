import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSingleUser = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { data,isLoading } = useQuery({
        queryKey: ['user'],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/users?email=${user.email}`)
            return res.data;
        }
    })
    return {data,isLoading}
};

export default useSingleUser;