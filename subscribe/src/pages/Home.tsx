import UnlockPremium from "../components/common/UnlockPremium"
import Features from "../components/common/Features"
import HeroSection from "../components/common/HeroSection"
import { useAppSelector } from "@/app/store"
import { Navigate } from "react-router-dom"

const Home = () => {
    const { isAuth } = useAppSelector((state) => state.rootReducers)

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