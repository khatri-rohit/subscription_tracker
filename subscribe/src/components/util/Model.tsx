
type Props = {
    children: React.ReactNode
    setting?: string
}

const Model = ({ children, setting }: Props) => {
    return (
        <div className={`${setting ? "bg-white/80 dark:bg-gray-800/80" : "bg-white dark:bg-gray-900/80"} h-screen absolute top-0 w-full flex items-center justify-center z-10`}>
    {children}
</div>
    )
}

export default Model