import { createContext, useContext, PropsWithChildren } from "react";

type AuthContextType = {
    apiUrl: string;
    // isAuthenticated: string;
    // setIsAuth: (isAuthenticated: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <AuthContext.Provider value={{ apiUrl, }}>
            {children}
        </AuthContext.Provider >
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
