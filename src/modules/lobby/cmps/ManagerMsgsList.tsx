import React from "react";
import { ManagerMsg } from "../../../types/Lobby"
import { ManagerMsgsPreview } from "./ManagerMsgsPreview"
import { UserMsg } from "@/types/User";

interface Props {
    managerMsgs: UserMsg[];
    isEditMode: boolean // Array of messages from the manager
    onRemoveMsg: (msg: ManagerMsg) => void; // Function to remove a message from the manager's list
}


export const ManagerMsgsList = ({ managerMsgs, isEditMode, onRemoveMsg }: Props) => {
    return (
        <section className={`manager-msgs-list ${isEditMode ? 'static-list' : ''}`}>
            {managerMsgs?.map((msg, idx) => (
                <React.Fragment key={msg.id}>
                    <ManagerMsgsPreview msg={msg} isEditMode={isEditMode} onRemoveMsg={onRemoveMsg}/>
                    {idx + 1 !== managerMsgs.length && <span className="horizontal-line-divider"></span>}
                </React.Fragment>
            ))}
        </section>
    )
}
