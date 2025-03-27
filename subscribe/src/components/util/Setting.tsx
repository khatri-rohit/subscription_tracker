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
                if (e.target.className.includes('bg-white/40')) {
                    setOpen(false);
                }
            }
        }
        window.addEventListener('mousedown', clickOutside);
        return () => window.removeEventListener('mousedown', clickOutside);
    }, []);

    return (
        <div ref={ref}
            className={`bg-white/40 z-10 h-screen w-full absolute`}>
            {children}
        </div>
    )
}

export default Setting