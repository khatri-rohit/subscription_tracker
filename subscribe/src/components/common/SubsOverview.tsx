import { formatDate } from "@/lib/utils"
import { motion } from 'motion/react'

interface Props {
    // _id: string
    name: string,
    status: 'active' | 'cancelled' | 'expired' | undefined,
    renewalDate: Date
}
const transition = {
    duration: 0.8,
    delay: 0.1,
    ease: [0, 0.71, 0.2, 1.01],
}

const SubsOverview = ({ name, renewalDate, status }: Props) => {
    return (
        <>
            <motion.div transition={transition} initial={{ opacity: 0 }} animate={{ opacity: 1, }} className="p-3 gap-3">
                <p className="text-xl font-medium">{name}</p>
                <p className={`text-lg ${status === 'active' ? "text-green-500" : status === 'expired' ? "text-red-500" : "text-gray-500/80"}`}>
                    {status}
                </p>
                <p>Renews: {formatDate(renewalDate)}</p>
            </motion.div >
        </>
    )
}

export default SubsOverview