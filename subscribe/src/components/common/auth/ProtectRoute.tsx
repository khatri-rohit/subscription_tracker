import { useAppSelector } from '@/app/store';
import { useAuth } from '@/context/Auth';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useAppSelector((state) => state.rootReducers.isAuth);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth()

    useEffect(() => {
        // Short delay to allow auth check to complete
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [user, isAuth]);

    // Show loading state while checking authentication
    if (isLoading) {
        return <div className='h-screen flex items-center justify-center'>
            <Loader size={70} className='animate-spin' />
        </div>;
    }
    return isAuth ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectRoute