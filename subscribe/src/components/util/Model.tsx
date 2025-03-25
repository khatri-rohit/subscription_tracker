
type Props = {
    children: React.ReactNode
    setting?: string
}

const Model = ({ children, setting }: Props) => {
    return (
        <div className={`${setting ? "bg-white/50" : "bg-white"} h-screen absolute top-0 w-full flex items-center justify-center`}>
            {children}
        </div>
    )
}

export default Model