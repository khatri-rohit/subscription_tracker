import { formatDate } from "@/lib/utils"

interface Props {
    // _id: string
    name: string,
    status: 'active' | 'cancelled' | 'expired' | undefined,
    renewalDate: Date
}

const SubsOverview = ({ name, renewalDate, status }: Props) => {
    return (
        <>
            <div className="p-3 gap-3">
                <p className="text-xl font-medium">{name}</p>
                <p className={`text-lg ${status === 'active' ? "text-green-500" : status === 'expired' ? "text-red-500" : "text-gray-500/80"}`}>
                {status}
                </p>
            <p>Renews: {formatDate(renewalDate)}</p>
        </div >
        </>
    )
}

export default SubsOverview