import { BellRing, Calculator, ChartNoAxesColumn, Ticket } from "lucide-react";
import Feature from "./Feature"

const featureDetails = [
    { heading: "Subscription Tracking", description: "Easily manage and track all your subscription in one place.", icon: <Ticket className="text-purple-500 my-1" /> },
    { heading: "Payment Reminders", description: "Never miss a paymeny with timely reminders and alert.", icon: <BellRing className="text-purple-500 my-1" /> },
    { heading: "Budget Management", description: "Set budgets and track your spending effortlessly", icon: <Calculator className="text-purple-500 my-1" /> },
    { heading: "Analytics Dashboard", description: "Gain insights with powerful analytics and reporting tools", icon: <ChartNoAxesColumn className="text-purple-500 my-1" />, gridProperty:"col-span-3" },
];

const Features = () => {

    return (
        <section className="p-4 pt-40">
            <div className="md:grid grid-cols-3 gap-24 w-fit m-auto">
                {
                    featureDetails.map(
                        (feature, index) =>
                            <Feature key={index} heading={feature.heading}
                                description={feature.description} icon={feature.icon} gridProperty={feature.gridProperty} />
                    )
                }
            </div>
        </section>
    )
}

export default Features