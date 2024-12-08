
import { useState } from "react"
import { useStore } from "../../../store/useStore"
import { ManagerMsg } from "../../../types/Lobby"
import { AppButton } from "../../common/cmps/AppButton"
import { ManagerMsgsList } from "./ManagerMsgsList"
import { AppDialog } from "@/modules/common/cmps/AppDialog"

interface Props {
  managerMsgs: ManagerMsg[]  // Array of messages from the manager
}

export const ManagerMsgsContainer = ({ managerMsgs }: Props) => {
  const [msgText, setMsgText] = useState('')
  const [msgToRemove, setMsgToRemove] = useState<ManagerMsg | null>(null)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const isEditMode = useStore((state) => state.isEditMode)
  const addManagerMsg = useStore((state) => state.addManagerMsg)
  const removeManagerMsg = useStore((state) => state.removeManagerMsg)


  const onSaveMsg = () => {
    msgText.trim()
    if (!msgText) return;  // Prevent adding an empty message
    addManagerMsg(msgText);
    setMsgText('');
  }

  const onRemoveMsg = (msg: ManagerMsg) => {
    setIsRemoveDialogOpen(true)
    setMsgToRemove(msg)
  }

  const removeMsg = () => {
    if (msgToRemove) {
      removeManagerMsg(msgToRemove)
    }
    setIsRemoveDialogOpen(false)
  }

  const onCancelRemove = () => {
    setIsRemoveDialogOpen(false)
    setMsgToRemove(null)
  }

  return (
    <section className="manager-msgs-container">
      <ManagerMsgsList managerMsgs={managerMsgs} isEditMode={isEditMode} onRemoveMsg={onRemoveMsg} />
      {isEditMode && <div className="edit-input-section">
        <input type="text" onChange={(ev) => setMsgText(ev.target.value)} value={msgText} />
        <AppButton text="הוסף" onClick={onSaveMsg} isDisabled={!msgText} />
      </div>}
      {isRemoveDialogOpen &&
        <AppDialog onClose={onCancelRemove} >
          <div className="remove-dialog-content">
            <h1>האם אתה בטוח שאתה רוצה למחוק את ההודעה?</h1>
            <div className="dialog-btn-container flex">
              <AppButton text="מחק" onClick={removeMsg} />
              <AppButton text="ביטול" type="secondary" onClick={onCancelRemove} />
            </div>
          </div>
        </AppDialog>}
    </section>
  )
}
