import { motion } from 'motion/react';
import { GithubIcon, Mail } from 'lucide-react';
import { Moon, Sun, MonitorCog } from 'lucide-react';

import { useTheme } from '../theme-provider';

import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

const Footer = () => {
  const { setTheme, theme } = useTheme();

  return (
    <motion.footer
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1, transition: { duration: .5, delay: .8 } }}
      className="bg-background text-foreground py-6 px-4 sm:px-6 border-t border-border">

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Subscription Tracker. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/khatri-rohit/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="hover:scale-110 transition-transform duration-200"
              >
                <GithubIcon className="size-5 sm:size-6 hover:text-primary transition-colors duration-200" />
              </a>
              <a
                href="mailto:rohitkhatri.dev@gmail.com"
                rel="noopener noreferrer"
                aria-label="Send support email"
                className="hover:scale-110 transition-transform duration-200"
              >
                <Mail className="size-5 sm:size-6 hover:text-primary transition-colors duration-200" />
              </a>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="flex gap-2 items-center rounded-md border dark:bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm whitespace-nowrap shadow-sm transition-all hover:scale-105"
                >
                  {theme === 'light' ? <Sun className="size-4 sm:size-5" /> :
                    theme === 'system' ? <MonitorCog className="size-4 sm:size-5" /> :
                      <Moon className="size-4 sm:size-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 sm:w-56">
                <DropdownMenuItem className="flex justify-between items-center py-2"
                  onClick={() => setTheme("light")}>
                  Light <Sun className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between items-center py-2"
                  onClick={() => setTheme("dark")}>
                  Dark <Moon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-between items-center py-2"
                  onClick={() => setTheme("system")}>
                  System <MonitorCog className="size-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;