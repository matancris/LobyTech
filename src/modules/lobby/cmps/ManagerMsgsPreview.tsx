import { AppIcon } from "@/modules/common/cmps/AppIcon";
import { ManagerMsg } from "../../../types/Lobby"


interface Props {
    msg: ManagerMsg;
    isEditMode: boolean;
    onRemoveMsg: (msg: ManagerMsg) => void; // Function to remove the message from the state array when the user clicks on the delete icon.
}

const renderTextWithBold = (text: string) => {
    // Split by asterisks but keep the asterisks in the result
    const segments = text.split(/(\*[^*]+\*)/); 
    
    return segments.map((segment, index) => {
        if (segment.startsWith('*') && segment.endsWith('*')) {
            // Remove asterisks and render as bold
            return <strong key={index}>{segment.slice(1, -1)}</strong>;
        }
        // Return regular text
        return segment ? <span key={index}>{segment}</span> : null;
    });
};

export const ManagerMsgsPreview = ({ msg, isEditMode, onRemoveMsg }: Props) => {
    return (
        <section className="manager-msgs-preview">
            <p>{renderTextWithBold(msg.text)}</p>
            {isEditMode &&
                <div className="remove-msg-container">
                    <AppIcon iconName="delete" onClick={() => onRemoveMsg(msg)}/>
                </div>
            }
        </section>
    )
}
