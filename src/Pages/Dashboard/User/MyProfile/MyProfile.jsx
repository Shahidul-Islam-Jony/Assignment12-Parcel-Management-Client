import { useContext, useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useSingleUser from "../../../../hooks/useSingleUser";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    const { data: user } = useSingleUser();
    const { user: fireBaseUser, updateUser, logout, setLoading } = useContext(AuthContext);
    // console.log(user);
    const axiosPublic = useAxiosPublic();
    const [imageUrl, setImageUrl] = useState('');

    const handleUpdateImage = async () => {
        const updateProfile = {
            photoUrl: imageUrl
        }
        console.log(imageUrl);
        await axiosPublic.patch(`/updateUser/${user._id}`, updateProfile)
            .then(res => {
                console.log(res);
                toast.success('Profile Picture Updated!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(err => {
                toast.error(`${err}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

        updateUser(fireBaseUser.displayName, imageUrl)
            .then(res => {
                setLoading(false)
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleUploadImageBB = async (e) => {
        const image = e.target.files[0]
        // console.log(image);
        const imageFile = { image: image }
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_url, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log('Image url', res.data.data.display_url);
        setImageUrl(res.data.data.display_url);
    }
    console.log(imageUrl);

    return (
        <div className="flex ml-80 mt-28">
            <div className="relative">
                <div className="card w-[600px] bg-primary text-primary-content">
                    <div className="card-body mt-16 text-center">
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <h2 className="text-xl font-bold">{user?.email}</h2>
                        <p className="font-medium">User ID : {user?._id}</p>
                        <p className="font-medium">User Type : {user?.type}</p>
                        <div className="flex justify-between mt-10">
                            <button onClick={() => logout()} className="btn btn-sm">Sign Out</button>
                            <input className="ml-20" type="file" onChange={handleUploadImageBB} name="image" id="" />
                            <button onClick={handleUpdateImage} className="btn btn-sm">Update Profile</button>
                        </div>
                    </div>
                </div>
                <div className="avatar -top-16 left-60 absolute z-40">
                    <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user?.photoUrl} />
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyProfile;