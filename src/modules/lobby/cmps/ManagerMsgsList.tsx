import { ManagerMsg } from "../../../types/Lobby"
import { ManagerMsgsPreview } from "./ManagerMsgsPreview"

interface Props {
    managerMsgs: ManagerMsg[];
    isEditMode: boolean // Array of messages from the manager
  }
  

export const ManagerMsgsList = ({managerMsgs, isEditMode}: Props) => {
    return (
        <section className={`manager-msgs-list ${isEditMode ? 'static-list' : ''}`}>
            {managerMsgs?.map((msg) => <ManagerMsgsPreview msg={msg} key={msg.id}/>)}
        </section>
    )
}
