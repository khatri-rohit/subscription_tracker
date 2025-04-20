import { BellRing, Calculator, ChartNoAxesColumn, Ticket } from "lucide-react";
import Feature from "./Feature";
import { motion } from "motion/react";

const featureDetails = [
    {
        heading: "Subscription Tracking",
        description: "Easily manage and track all your subscription in one place.",
        icon: <Ticket className="text-purple-500 dark:text-purple-400 my-1" />,
    },
    {
        heading: "Payment Reminders",
        description: "Never miss a payment with timely reminders and alert.",
        icon: <BellRing className="text-purple-500 dark:text-purple-400 my-1" />,
    },
    {
        heading: "Budget Management",
        description: "Set budgets and track your spending effortlessly",
        icon: <Calculator className="text-purple-500 dark:text-purple-400 my-1" />,
    },
    {
        heading: "Analytics Dashboard",
        description: "Gain insights with powerful analytics and reporting tools",
        icon: <ChartNoAxesColumn className="text-purple-500 dark:text-purple-400 my-1" />,
        gridProperty: "col-span-3",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const Features = () => {
    return (
        <section className="px-4 py-16 md:py-32 shadow bg-white dark:bg-gray-900 transition-colors duration-500">
            <motion.h4
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl text-center font-[700] pb-12 md:pb-24 text-gray-900 dark:text-white"
            >
                Features
            </motion.h4>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="md:grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-24 max-w-7xl mx-auto px-4">
                {featureDetails.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={feature.gridProperty}>

                        <Feature
                            heading={feature.heading}
                            description={feature.description}
                            icon={feature.icon}
                            gridProperty={feature.gridProperty}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Features;