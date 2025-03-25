import useUser from "@/components/hook/AuthUser"
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }: PropsWithChildren) => {
    const [userId] = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId === null) {
            navigate('/', { replace: true });
        } else navigate('/dashboard');
    }, [navigate, userId])

    return children
}

export default ProtectRoute