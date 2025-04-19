import { Navigate } from "react-router-dom"

import { useAppSelector } from "@/app/store"

import UnlockPremium from "../components/common/UnlockPremium"
import Features from "../components/common/Features"
import HeroSection from "../components/common/HeroSection"

const Home = () => {
    const isAuth = useAppSelector((state) => state.rootReducers.isAuth)

    if (isAuth)
        return <Navigate to="/dashboard" replace />

    return (
        <main>
            <HeroSection />
            <Features />
            <UnlockPremium />
        </main>
    )
}

export default Home