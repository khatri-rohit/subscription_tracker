import { useEffect } from 'react'
import { isAuthenticated } from '@/features/slice'
import { useAppDispatch } from '@/app/store'
import { useAuth } from '@/context/Auth'

const useUser = () => {
    const { apiUrl } = useAuth()

    const dispatch = useAppDispatch()

    const getLoggedInUser = () => {
        try {
            console.log("object");
        } catch (error: unknown) {
            // setUser(null);
            console.log("UnAuthorised Token");
            console.log(error);
        }
    }

    useEffect(() => {
        getLoggedInUser()
    }, [])

    return [];
}

export default useUser