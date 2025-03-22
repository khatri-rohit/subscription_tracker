import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    apiUrl: string;
    isAuthenticated: boolean;
    user: null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const [isAuthenticated, setIsAuth] = useState<boolean>(false);

    const [user, setUser] = useState(null);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, apiUrl }}>
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
