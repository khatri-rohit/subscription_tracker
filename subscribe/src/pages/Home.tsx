import UnlockPremium from "../components/common/UnlockPremium"
import Features from "../components/common/Features"
import HeroSection from "../components/common/HeroSection"
import SignUp from "../components/common/auth/SignUp"

const Home = () => {
    return (
        <main>
            <HeroSection />
            <Features />
            <UnlockPremium />
            <SignUp />
        </main>
    )
}

export default Home