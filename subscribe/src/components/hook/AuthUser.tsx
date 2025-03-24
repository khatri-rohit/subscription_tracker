import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

type UserID = {
    id: string
}

const useUser = () => {
    const [userId, setUser] = useState<UserID | null>(null);
    const token: string | null = localStorage.getItem('isagi-kun');

    const getLoggedInUser = async (jwtToken: string) => {
        console.log("Getting User");
        const decode: UserID = await jwtDecode(jwtToken);
        console.log(decode);
        setUser(decode);
    }

    useEffect(() => {
        if (token !== null)
            getLoggedInUser(token);
        console.log(token);
    }, [])

    return [userId];
}

export default useUser