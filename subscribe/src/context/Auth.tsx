import { useAppDispatch } from "@/app/store";
import { isAuthenticated } from "@/features/slice";
import axios from "axios";
import {
    createContext,
    useContext,
    PropsWithChildren,
    useState,
    useEffect,
    cache
} from "react";

type User = {
    _id: string
    firstName: string
    lastName: string
    email: string
    createdAt: string,
    profileImage: string
}

type AuthContextType = {
    apiUrl: string;
    imageUrl: string;
    user: User | null
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const imageUrl = import.meta.env.VITE_IMAGE_URL;

    const dispatch = useAppDispatch();

    const getLoggedInUser = cache(async () => {
        try {
            axios.defaults.withCredentials = true;
            const request = await axios.post(`${apiUrl}/users/`);
            console.log(request.data.data);
            dispatch(isAuthenticated(true));
            setUser(request.data.data);
            console.log("Previous Session");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setUser(null);
            dispatch(isAuthenticated(false));
            console.log("No Session");
        }
    })

    useEffect(() => {
        getLoggedInUser();
    }, [])

    return (
        <AuthContext.Provider value={{ apiUrl, user, imageUrl }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
