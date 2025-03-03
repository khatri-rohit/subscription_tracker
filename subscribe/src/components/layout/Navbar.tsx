import { Button } from "../ui/button"

const Navbar = () => {
    return (
        <header>
            <nav className="shadow-lg">
                <div className="navbar flex items-center justify-between p-3">
                    <div className="nav-left flex items-center justify-between">
                        <img className="object-cover mx-1" src="/img/icon.png" alt="brand-icon" />
                        <h1 className="text-4xl mx-1">SubScribe</h1>
                    </div>
                    <div className="nav-right ">
                        <Button className="bg-[#636AE8] hover:bg-[#565ba9] transition-all duration-300 cursor-pointer"> <img src="/img/newsletter.png" alt="" /> SignUp</Button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar