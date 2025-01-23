import { useState } from "react"
import { useStore } from "../../../store/useStore"
import { AppButton } from "../../common/cmps/AppButton"
import { ManagerMsgsList } from "./ManagerMsgsList"
import { AppDialog } from "@/modules/common/cmps/AppDialog"
import { UserMsg } from "@/types/User"

interface Props {
  managerMsgs: UserMsg[]; // Array of messages from the manager
}

export const ManagerMsgsContainer = ({ managerMsgs }: Props) => {
  const [msgText, setMsgText] = useState('')
  const [msgToRemove, setMsgToRemove] = useState<UserMsg | null>(null)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const isEditMode = useStore((state) => state.isEditMode)
  const addManagerMsg = useStore((state) => state.addUserMsg)
  const removeManagerMsg = useStore((state) => state.removeUserMsg)

  const onSaveMsg = () => {
    const trimmedText = msgText.trim()
    if (!trimmedText) return;  // Prevent adding an empty message
    
    // Store the text with asterisks (for bold text) directly, no HTML conversion
    addManagerMsg(trimmedText);
    setMsgText('');
  }

  const onRemoveMsg = (msg: UserMsg) => {
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
        <input 
          type="text" 
          onChange={(ev) => setMsgText(ev.target.value)} 
          value={msgText}
          placeholder="Use *word* for bold text"
        />
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
