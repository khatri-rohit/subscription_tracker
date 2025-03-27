import useUser from "@/components/hook/AuthUser"
import { PropsWithChildren, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }: PropsWithChildren) => {
    const [userId] = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (userId === null) {
            navigate('/');
        } else {
            if (location.pathname === '/subscription')
                navigate('/subscription');
            else
                navigate('/dashboard');
            console.log(location.pathname);
        }
    }, [userId])

    return children
}

export default ProtectRoute