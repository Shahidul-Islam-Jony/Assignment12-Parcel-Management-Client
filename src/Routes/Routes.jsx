import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import BookAParcel from "../Pages/Dashboard/User/BookAParcel/BookAParcel";
import MyParcel from "../Pages/Dashboard/User/MyParcel/MyParcel";
import MyProfile from "../Pages/Dashboard/User/MyProfile/MyProfile";
import UpdateBooking from "../Pages/UpdateBooking/UpdateBooking";
import Statistics from "../Pages/Dashboard/Admin/Statistics/Statistics";
import AllParcels from "../Pages/Dashboard/Admin/AllParcels/AllParcels";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'registration',
                element: <Registration></Registration>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // users routes
            {
                path: 'bookParcel',
                element: <BookAParcel></BookAParcel>
            },
            {
                path: 'myParcel',
                element: <MyParcel></MyParcel>
            },
            {
                path: 'updateBooking/:id',
                element: <UpdateBooking></UpdateBooking>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            // Admin Routes

            {
                path: 'statistics',
                element: <Statistics></Statistics>
            }, {
                path: 'allParcels',
                element: <AllParcels></AllParcels>
            }
        ]
    },
])

export default router;