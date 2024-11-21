import { ManagerMsg } from "../../../types/Lobby"


interface Props {
    msg: ManagerMsg;
}
export const ManagerMsgsPreview = ({ msg }: Props) => {
    return (
        <section className="manager-msgs-preview">
            {msg.text}
        </section>
    )
}
