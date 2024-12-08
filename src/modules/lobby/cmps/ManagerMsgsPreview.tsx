import { AppIcon } from "@/modules/common/cmps/AppIcon";
import { ManagerMsg } from "../../../types/Lobby"


interface Props {
    msg: ManagerMsg;
    isEditMode: boolean;
    onRemoveMsg: (msg: ManagerMsg) => void; // Function to remove the message from the state array when the user clicks on the delete icon.
}
export const ManagerMsgsPreview = ({ msg, isEditMode, onRemoveMsg }: Props) => {
    return (
        <section className="manager-msgs-preview">
            <p>{msg.text}</p>
            {isEditMode &&
                <div className="remove-msg-container">
                    <AppIcon iconName="delete" onClick={() => onRemoveMsg(msg)}/>
                </div>
            }
        </section>
    )
}
