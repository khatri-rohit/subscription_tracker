import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { ChevronDown } from "lucide-react";

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    console.log(theme);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-[50%]">
                <Button size="icon" className="bg-inherit hover:bg-white/0 cursor-pointer border-none outline-none focus:outline-none active:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[0px] ">
                    {theme === 'light' ? (<p className="h-[1.2rem] w-[1.2rem] text-center rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-black flex items-center">
                        Light <ChevronDown />
                    </p>) : (<p className="h-[1.2rem] w-[1.2rem] text-center rotate-0 scale-100 transition-all flex items-center">
                        {theme === 'system' ? "System" : "Dark"} <ChevronDown />
                    </p>)}
                    <span className="sr-only">
                        Toggle theme
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
