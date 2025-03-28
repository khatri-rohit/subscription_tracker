import { useAppSelector } from "@/app/store";
import { useAuth } from "@/context/Auth";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }: PropsWithChildren) => {
    // const { user } = useAuth();
    const isAuth = useAppSelector((state) => state.isAuth)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(isAuth);
        if (!isAuth) {
            navigate('/')
        } else {
            if (location.pathname === '/subscription')
                navigate('/subscription');
            else if (location.pathname === '/subscription/create-subs')
                navigate('/subscription/create-subs');
            else
                navigate('/dashboard');
        }
    }, [isAuth])

    return children
}

export default ProtectRoute