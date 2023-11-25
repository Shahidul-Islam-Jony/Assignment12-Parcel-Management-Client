import { Link, useRouteError } from 'react-router-dom';
import errorImage from '../../assets/images/errorPage.jpg'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ErrorPage = () => {
    const error = useRouteError();
    // console.log(error);
    return (
        <HelmetProvider>
           <Helmet><title>Error | Page Not Found</title></Helmet>
            {
                error?.status === 404 && <div className='text-center relative'>
                    <img src={errorImage} className=' h-screen w-full' alt="" />
                    <div className='absolute bottom-10 right-1/3'>
                        <Link className='btn btn-primary px-16' to='/'>Go Back to home</Link>
                    </div>
                </div>
            }
        </HelmetProvider>
    );
};

export default ErrorPage;