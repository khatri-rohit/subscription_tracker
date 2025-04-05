import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAppSelector } from '@/app/store';
import { useAuth } from '@/context/Auth';

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useAppSelector((state) => state.rootReducers.isAuth);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation()
    const { user } = useAuth()

    useEffect(() => {
        // Short delay to allow auth check to complete
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 10);

        return () => clearTimeout(timer);
    }, [user, isAuth]);

    // Show loading state while checking authentication
    if (isLoading) {
        return <div className='h-screen flex items-center justify-center'>
            <Loader size={70} className='animate-spin' />
        </div>;
    }

    if (!isAuth) {
        console.log("Rohit");
        return <Navigate to="/" />
    }

    if (isAuth && location.pathname === '/'){
        return <Navigate to="/dashboard" />
    }

    return <>{children}</>
};

export default ProtectRoute