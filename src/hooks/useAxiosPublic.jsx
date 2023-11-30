import axios from 'axios'

// axios instance
const axiosPublic = axios.create({
    baseURL: 'https://assignment12-server-jym80zao6-shahidul-islams-projects.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;