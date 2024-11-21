import { ManagerMsg } from "../../../types/Lobby"
import { ManagerMsgsList } from "./ManagerMsgsList"

interface Props {
  managerMsgs: ManagerMsg[]  // Array of messages from the manager
}

export const ManagerMsgsContainer = ({ managerMsgs }: Props) => {
  return (
    <section className="manager-msgs-container">
      <h2>Committee Messages</h2>
      <ManagerMsgsList managerMsgs={managerMsgs} />
    </section>
  )
}
