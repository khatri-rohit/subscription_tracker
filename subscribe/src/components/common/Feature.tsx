import clsx from "clsx";
import { motion } from "framer-motion";

type Props = {
    heading: string,
    icon: React.ReactElement,
    description: string,
    gridProperty?: string
}

const Feature = ({ heading, description, icon, gridProperty }: Props) => {
    return (
        <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={clsx(
                "h-full flex flex-col items-center justify-between",
                "w-[90%] md:w-[80%] lg:w-[60%]", // Responsive widths
                "m-auto text-center p-4",
                "gap-y-4 md:gap-y-6", // Responsive spacing
                gridProperty
            )}
        >
            <motion.h3 
                className="font-semibold text-xl md:text-2xl lg:text-3xl break-words md:text-nowrap"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {heading}
            </motion.h3>
            
            <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {icon}
            </motion.div>
            
            <motion.p 
                className="text-[0.875em] md:text-[1em]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {description}
            </motion.p>
        </motion.article>
    );
};

export default Feature;