import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
import { useAuth } from '@/context/Auth';
import Loading from '@/components/Loading';

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuth = useAppSelector((state) => state.rootReducers.isAuth);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation()
    const { user, getLoggedInUser } = useAuth()

    useEffect(() => {
        getLoggedInUser()
    }, [])

    useEffect(() => {
        // Short delay to allow auth check to complete
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        // console.log(user);
        return () => clearTimeout(timer);
    }, [user, isAuth]);

    // Show loading state while checking authentication
    if (isLoading) {
        return <Loading />
    }

    if (!isAuth)
        return <Navigate to="/" />

    if (isAuth && location.pathname === '/') {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>
};

export default ProtectRoute