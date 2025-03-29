import { useAppSelector } from "@/app/store";
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }: PropsWithChildren) => {
    const isAuth = useAppSelector((state) => state.rootReducers.isAuth)
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
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