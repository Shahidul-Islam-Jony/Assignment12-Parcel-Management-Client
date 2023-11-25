import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layout/Dashboard";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'login',
                element:<Login></Login>
            }
        ]
    }
])

export default router;