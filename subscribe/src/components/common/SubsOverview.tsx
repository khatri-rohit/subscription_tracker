import { formatDate } from "@/lib/utils"

interface Props {
    // _id: string
    name: string,
    status: 'active' | 'cancelled' | 'expired',
    renewalDate: Date
}

const SubsOverview = ({ name, renewalDate, status }: Props) => {
    return (
        <>
            <div className="p-3 gap-3">
                <p className="text-xl font-medium">{name}</p>
                <p className="text-lg text-gray-500/80">{status}</p>
                <p>Renews: {formatDate(renewalDate)}</p>
            </div>
        </>
    )
}

export default SubsOverview