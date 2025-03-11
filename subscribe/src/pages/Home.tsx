import UnlockPremium from "../components/common/UnlockPremium"
import Features from "../components/common/Features"
import HeroSection from "../components/common/HeroSection"
import SignUp from "../components/common/auth/SignUp"
import SignIn from "@/components/common/auth/SignIn"

const Home = () => {
    return (
        <main>
            <HeroSection />
            <Features />
            <UnlockPremium />
            <SignUp />
            {/* <SignIn /> */}
        </main>
    )
}

export default Home