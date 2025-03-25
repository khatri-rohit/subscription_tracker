import { useEffect, useRef } from "react"

type Props = {
    children: React.ReactNode,
    setOpen: (open: boolean) => void
}

const Setting = ({ children, setOpen }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement) {
                if (e.target.className.includes('bg-white/80')) {
                    setOpen(false);
                }
            }
            console.log();
        }
        window.addEventListener('mousedown', clickOutside);
        return () => window.removeEventListener('mousedown', clickOutside);
    }, []);

    return (
        <div ref={ref}
            className={`bg-white/80 z-10 h-screen w-full absolute`}>
            {children}
        </div>
    )
}

export default Setting