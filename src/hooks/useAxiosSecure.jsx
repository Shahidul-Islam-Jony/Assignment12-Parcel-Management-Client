import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://assignment12-server-jym80zao6-shahidul-islams-projects.vercel.app'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;