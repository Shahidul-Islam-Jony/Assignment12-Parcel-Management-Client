import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://assignment12-server-rosy-sigma.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;