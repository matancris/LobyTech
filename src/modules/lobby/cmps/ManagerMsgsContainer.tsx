
import { useEffect, useState } from "react"
import { useStore } from "../../../store/useStore"
import { ManagerMsg } from "../../../types/Lobby"
import { AppButton } from "../../common/cmps/AppButton"
import { ManagerMsgsList } from "./ManagerMsgsList"

interface Props {
  managerMsgs: ManagerMsg[]  // Array of messages from the manager
}

export const ManagerMsgsContainer = ({ managerMsgs }: Props) => {
  const [msgText, setMsgText] = useState('')
  // get isEditMode from Zustand store
  const isEditMode = useStore((state) => state.isEditMode)
  const addManagerMsg = useStore((state) => state.addManagerMsg)

  useEffect(() => {
    console.log("🚀 ~ ManagerMsgsContainer ~ isEditMode:", managerMsgs)
  }, [managerMsgs])

  const onSaveMsg = () => {
    addManagerMsg(msgText);
    setMsgText('');
  }
  return (
    <section className="manager-msgs-container">
      <h2>Committee Messages</h2>
      <ManagerMsgsList managerMsgs={managerMsgs} isEditMode={isEditMode} />
      {isEditMode && <div className="edit-input-section">
        <input type="text" onChange={(ev) => setMsgText(ev.target.value)} value={msgText}/>
        <AppButton text="add" onClick={onSaveMsg} />
      </div>}
    </section>
  )
}
