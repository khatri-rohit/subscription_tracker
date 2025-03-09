

type Props = {
    children: React.ReactNode
}

const Model = ({ children }: Props) => {
    return (
        <div className="bg-white h-screen absolute top-0 w-full flex items-center justify-center">
            {children}
        </div>
    )
}

export default Model