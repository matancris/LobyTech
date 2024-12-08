import { ReactNode } from "react";
import { AppCard } from "./AppCard";
import { AppLogo } from "./AppLogo";



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
            <div className="top-section">
                <AppLogo />
                {children[0]}
                {children[1]}
                {children[2]}
                {children[3]}
            </div>


            <div className="main-left-section">
                {children[4]}
            </div>
            <div className="main-right-section">
                {children.slice(5, children.length - 1).map((child, idx) => (
                    <AppCard key={idx}>
                        {child}
                    </AppCard>
                ))}
            </div>
            <div className="bottom-section">
                {children[children.length - 1]}
            </div>

        </div>)

    }

    return (
        <section className='app-layout'>
            <DefaultLayout />
        </section>
    )
}
