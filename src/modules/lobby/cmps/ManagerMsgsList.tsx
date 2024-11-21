import { ManagerMsg } from "../../../types/Lobby"
import { ManagerMsgsPreview } from "./ManagerMsgsPreview"

interface Props {
    managerMsgs: ManagerMsg[]  // Array of messages from the manager
  }
  

export const ManagerMsgsList = ({managerMsgs}: Props) => {
    return (
        <section className="manager-msgs-list">
            {managerMsgs.map(msg => <ManagerMsgsPreview msg={msg} />)}
        </section>
    )
}
