import { Button } from "../ui/button"

const UnlockPremium = () => {
    return (
        <div className="py-24">
            <div className="w-8/12 bg-[#e5e6ff] m-auto text-center py-16">
                <h5 className="text-2xl text-[#454efc] font-semibold">Unlock Premium Content</h5>
                <p className="py-3">
                    Join now to access exclusive articles and features tailored just for you.
                </p>
                <Button className="bg-[#636AE8] hover:bg-[#565ba9] transition-all duration-300 cursor-pointer">
                    Sign Up Now
                </Button>
            </div>
        </div>
    )
}

export default UnlockPremium