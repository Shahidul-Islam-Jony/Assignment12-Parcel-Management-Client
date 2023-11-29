/* eslint-disable react/no-unescaped-entities */
import parcelSafety from "../../../assets/images/ParcelSafety.png"
import superFast from "../../../assets/images/superFast.png"
import customerSupport from "../../../assets/images/customerSupport.png"
import CountUp from 'react-countup';
import { TbTruckDelivery } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";


const Features = () => {
    const axiosPublic = useAxiosPublic();
    const [numOfPeoples, setNumOfPeoples] = useState(0);
    const [parcelBooked, setParcelBooked] = useState(0);
    const [parcelDelivery, setParcelDelivery] = useState(0);

    useEffect(() => {
        axiosPublic.get('/counts')
            .then(res => {
                console.log(res.data.numOfPeople);
                setNumOfPeoples(res.data.numOfPeople)
                setParcelBooked(res.data.parcelBooked)
                setParcelDelivery(res.data.parcelDelivery)
            })
    }, [axiosPublic])

    // console.log(numOfPeoples, parcelBooked, parcelDelivery);

    return (
        <div>
            <h2 className="text-4xl text-center my-16 text-blue-800 font-medium">--- Our Features ---</h2>
            <div className="flex justify-between gap-10 mb-10">
                {/* Parcel Safety */}
                <div className="card card-compact w-[600px] pb-7 bg-blue-600 shadow-black shadow-xl">
                    <figure><img src={parcelSafety} className="w-full h-72" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-center text-3xl font-bold mb-4 text-white">Parcel Safety</h2>
                        <p className="text-lg text-white font-serif">At Parcel Point, we understand the significance of your parcels and the trust you place in our services. Ensuring the safety and security of your packages is our top priority. We employ a range of robust measures to safeguard your deliveries throughout their journey with us.</p>
                    </div>
                    <div className="flex justify-center text-xl font-extrabold mt-4 text-yellow-300">
                        <span className="text-2xl text-white mr-2"><FaBook /></span><span>Parcel Booked : </span>
                        <CountUp end={parcelBooked} duration={10} />
                    </div>
                    <div className="flex justify-center text-xl font-extrabold text-yellow-300">
                        <span className="text-3xl text-white mr-2"><TbTruckDelivery /></span><span> Parcel Delivered : </span>
                        <CountUp end={parcelDelivery} duration={10} />
                    </div>
                    <div className="flex justify-center text-xl font-extrabold text-yellow-300">
                        <span className="text-3xl text-white mr-2"><FaPeopleGroup /></span><span>People Using : </span>
                        <CountUp end={numOfPeoples} duration={10} />
                    </div>
                </div>
                {/* Super Fast */}
                <div className="card card-compact w-[600px] pb-7 bg-blue-600 shadow-black shadow-xl">
                    <figure><img src={superFast} className="w-full h-72" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-center text-3xl font-bold text-white mb-4">Super Fast</h2>
                        <p className="text-lg text-white font-serif">Welcome to Parcel Point, where we redefine the meaning of speed in parcel delivery. Our commitment to efficiency and customer satisfaction drives us to offer super-fast delivery services that set us apart in the industry.</p>
                    </div>
                    <div className="flex justify-center text-xl font-extrabold mt-4 text-yellow-300">
                        <span className="text-2xl text-white mr-2"><FaBook /></span><span>Parcel Booked : </span>
                        <CountUp end={parcelBooked} duration={10} />
                    </div>
                    <div className="flex justify-center text-xl font-extrabold text-yellow-300">
                        <span className="text-3xl text-white mr-2"><TbTruckDelivery /></span><span> Parcel Delivered : </span>
                        <CountUp end={parcelDelivery} duration={10} />
                    </div>
                    <div className="flex justify-center text-xl font-extrabold text-yellow-300">
                        <span className="text-3xl text-white mr-2"><FaPeopleGroup /></span><span>People Using : </span>
                        <CountUp end={numOfPeoples} duration={10} />
                    </div>
                </div>
                {/* Real-Time Customer Support */}
                <div className="card card-compact w-[600px] bg-blue-600 pb-7 shadow-black shadow-xl">
                    <figure><img src={customerSupport} className="w-full h-72" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="text-center mb-4 text-3xl font-bold text-white">Real-Time Customer Support</h2>
                        <p className="text-lg text-white font-serif">At Parcel Point, we understand that exceptional customer support is just as crucial as prompt parcel delivery. That's why we're proud to offer real-time customer support that goes beyond expectations.Whether you have questions about a specific delivery, need help with tracking.</p>
                    </div>
                    <div className="flex justify-center text-xl font-extrabold mt-4 text-yellow-300">
                        <span className="text-2xl text-white mr-2"><FaBook /></span><span>Parcel Booked : </span>
                        <CountUp end={parcelBooked} duration={10} />
                    </div>
                    <div className="flex justify-center text-xl font-extrabold text-yellow-300">
                        <span className="text-3xl text-white mr-2"><TbTruckDelivery /></span><span> Parcel Delivered : </span>
                        <CountUp end={parcelDelivery} duration={10} />
                    </div>
                    <div className="flex justify-center text-xl font-extrabold text-yellow-300">
                        <span className="text-3xl text-white mr-2"><FaPeopleGroup /></span><span>People Using : </span>
                        <CountUp end={numOfPeoples} duration={10} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;