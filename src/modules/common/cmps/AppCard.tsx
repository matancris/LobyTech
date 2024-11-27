import { ReactNode } from "react"

interface Props {
    children?: ReactNode;
}
export const AppCard = ({ children }: Props) => {
    return (
        <section className="app-card">
            {children}
        </section>
    )
}
