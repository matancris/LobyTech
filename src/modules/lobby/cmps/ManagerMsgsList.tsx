import React from "react";
import { ManagerMsg } from "../../../types/Lobby"
import { ManagerMsgsPreview } from "./ManagerMsgsPreview"

interface Props {
    managerMsgs: ManagerMsg[];
    isEditMode: boolean // Array of messages from the manager
}


export const ManagerMsgsList = ({ managerMsgs, isEditMode }: Props) => {
    return (
        <section className={`manager-msgs-list ${isEditMode ? 'static-list' : ''}`}>
            {managerMsgs?.map((msg, idx) => (
                <React.Fragment key={msg.id}>
                    <ManagerMsgsPreview msg={msg} />
                    {idx + 1 !== managerMsgs.length && <span className="horizontal-line-divider"></span>}
                </React.Fragment>
            ))}
        </section>
    )
}
