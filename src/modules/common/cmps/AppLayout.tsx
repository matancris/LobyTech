import { ReactNode } from "react";
import { AppCard } from "./AppCard";
import { AppClock } from "./AppClock";
import { AppWeather } from "./AppWeather";
import { NewsFlashes } from "../../lobby/cmps/NewsFlashes";

type LayoutType = "default" | "grid" | "list";

interface ReorderWrapperProps {
    children: ReactNode[]; // Multiple children passed as an array
    layout?: LayoutType; // Optional layout type
    gap?: string; // Spacing between items
    className?: string; // Additional custom class names
}

export const AppLayout = ({ children, layout = "default" }: ReorderWrapperProps) => {

    const DefaultLayout = () => {
        return (<div className={`layout-default ${layout === "grid" ? "grid-layout" : ""}`}>
            {/* <div className="top-section"> */}
            <AppClock />
            <AppWeather />
            {/* </div> */}
            <div className="left-section">
                {children[0]}
            </div>
            <div className="right-section">
                {children.slice(1).map((child, idx) => (
                    <AppCard key={idx}>
                        {child}
                    </AppCard>
                ))}
            </div>
            <div className="bottom-section">
                <NewsFlashes />
            </div>

        </div>)

    }

    return (
        <section className='app-layout'>
            <DefaultLayout />
        </section>
    )
}
