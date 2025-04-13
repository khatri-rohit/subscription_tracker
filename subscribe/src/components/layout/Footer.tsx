import { motion } from 'motion/react';
import { GithubIcon, Mail } from 'lucide-react';
import { Moon, Sun, MonitorCog } from 'lucide-react';

import { useTheme } from '../theme-provider';

import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const Footer = () => {
  const { setTheme, theme } = useTheme();

  return (
    <motion.footer initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1, transition: { duration: .5, delay: .8 } }}
      className="bg-background text-foreground p-4 border-t border-border">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Subscription Tracker. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://github.com/khatri-rohit/" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
            <GithubIcon className="size-6 hover:text-primary transition-colors duration-200" />
          </a>
          <a href="mailto:rohitkhatri.dev@gmail.com" rel="noopener noreferrer" aria-label="Send support email">
            <Mail className="size-6 hover:text-primary transition-colors duration-200" />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex gap-2 items-center rounded-md border dark:bg-white px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50">
                {theme === 'light' ? <Sun /> : theme === 'system' ? <MonitorCog /> : <Moon />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem className="flex justify-between"
                onClick={() => setTheme("light")}>
                Light <Sun />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between"
                onClick={() => setTheme("dark")}>
                Dark <Moon />
              </DropdownMenuItem>
              <DropdownMenuItem className="flex justify-between"
                onClick={() => setTheme("system")}>
                System <MonitorCog />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;