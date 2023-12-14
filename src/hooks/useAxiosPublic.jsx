import axios from 'axios'

// axios instance
const axiosPublic = axios.create({
    baseURL: 'https://assignment12-server-rosy-sigma.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;