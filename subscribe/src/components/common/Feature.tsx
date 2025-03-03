import clsx from "clsx"

type Props = {
    heading: string,
    icon: React.ReactElement,
    description: string,
    gridProperty?: string
}

const Feature = ({ heading, description, icon, gridProperty }: Props) => {

    return (
        <article className={clsx("h-full flex flex-col items-center justify-between w-[60%] m-auto text-center", gridProperty)}>
            <h3 className="font-semibold text-3xl text-nowrap">{heading}</h3>
            {icon}
            <p className="text-[1em]">
                {description}
            </p>
        </article>
    )
}

export default Feature