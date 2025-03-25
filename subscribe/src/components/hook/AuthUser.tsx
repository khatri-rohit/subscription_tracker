import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { isAuthenticated } from '@/features/slice'
import { useAppDispatch } from '@/app/store'

type UserID = {
    userId: string;
    iat: number;
    exp: number;
}

const useUser = () => {
    const [userId, setUser] = useState<UserID | null>(null)
    const dispatch = useAppDispatch()

    const getLoggedInUser = (jwtToken: string) => {
        try {
            const decode: UserID = jwtDecode(jwtToken);
            console.log(decode);
            console.log("Authorised Token");
            dispatch(isAuthenticated(true))
            setUser(decode);
        } catch (error: unknown) {
            setUser(null);
            console.log("UnAuthorised Token");
            console.log(error);
        }
    }

    useEffect(() => {
        const token: string | null = localStorage.getItem('isagi-kun')
        if (token !== null)
            getLoggedInUser(token);
    }, [])

    return [userId];
}

export default useUser