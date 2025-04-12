import { NavLink } from "react-router-dom"
import { Button } from "../ui/button"

const HeroSection = () => {
    return (
        <section className="h-[91vh] relative z-10">
            <img className="absolute object-cover w-full -z-10  backdrop-opacity-90" src="/img/hero.png" alt="living-room" />
            <div className="md:p-56 h-full text-white flex flex-col items-start justify-center">
                <p className="text-6xl font-extrabold mb-5">Master Your Subscription</p>
                <p className="text-2xl leading-7 mb-5">
                    Effortlessly track and manage all your subscriptions in one place.
                </p>
                <Button className="bg-[#636AE8] dark:text-white hover:bg-[#565ba9] transition-all duration-300 cursor-pointer text-lg font-[400] tracking-wide p-6">
                    <NavLink to={"/signup"}>
                        Get Started
                    </NavLink>
                </Button>
            </div>
        </section>
    )
}

export default HeroSection