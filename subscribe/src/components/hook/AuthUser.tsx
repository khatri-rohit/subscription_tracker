import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

type UserID = {
    id: string
}

const useUser = () => {
    const [userId, setUser] = useState<UserID | null>(null);

    const getLoggedInUser = async () => {
        if (typeof localStorage.getItem('isagi-kun') === 'string') {
            const decode: UserID = await jwtDecode(localStorage.getItem('isagi-kun')!);
            console.log(decode);
            setUser(decode);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('isagi-kun') === 'string') {
            getLoggedInUser();
        }
    }, [])

    return [userId];
}

export default useUser