import { useAppDispatch } from "@/app/store";
import { isAuthenticated } from "@/features/slice";
import axios, { AxiosError } from "axios";
import {
    createContext,
    useContext,
    PropsWithChildren,
    useState,
    useEffect,
} from "react";

type User = {
    _id: string
    firstName: string
    lastName: string
    email: string
    createdAt: string,
    profileImage: string,
    notify: boolean;
    password?: string;
}

type AuthContextType = {
    apiUrl: string,
    imageUrl: string,
    clientId: string,
    serverUri: string,
    user: User | null,
    getLoggedInUser: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const imageUrl = import.meta.env.VITE_IMAGE_URL;
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT;
    const serverUri = import.meta.env.VITE_SERVER_URI || 'http://localhost:5500';

    const dispatch = useAppDispatch();

    const getLoggedInUser = async () => {
        // console.log("called");
        try {
            axios.defaults.withCredentials = true;
            const request = await axios.post(`${apiUrl}/users/`);
            // console.log(request.data.data);
            dispatch(isAuthenticated(true));
            setUser(request.data.data);
            // console.log("Previous Session");
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);

            setUser(null);
            dispatch(isAuthenticated(false));
            // console.log("No Session");
        }
    }

    useEffect(() => {
        getLoggedInUser()
    }, [])

    return (
        <AuthContext.Provider value={{ clientId, serverUri, apiUrl, user, imageUrl, getLoggedInUser }}>
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
