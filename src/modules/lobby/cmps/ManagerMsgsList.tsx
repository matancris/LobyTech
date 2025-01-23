import React, { useState, useEffect } from "react";
import { ManagerMsg } from "../../../types/Lobby"
import { ManagerMsgsPreview } from "./ManagerMsgsPreview"
import { UserMsg } from "@/types/User";

const SWITCH_MSG_INTERVAL = 5000;

interface Props {
    managerMsgs: UserMsg[];
    isEditMode: boolean // Array of messages from the manager
    onRemoveMsg: (msg: ManagerMsg) => void; // Function to remove a message from the manager's list
}

export const ManagerMsgsList = ({ managerMsgs, isEditMode, onRemoveMsg }: Props) => {
    const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!managerMsgs?.length || isEditMode) return;

        const fadeOutTimer = setTimeout(() => {
            setIsVisible(false);
        }, SWITCH_MSG_INTERVAL - 500); // Fade out after 4.5s

        const switchTimer = setTimeout(() => {
            setCurrentMsgIndex((prev) => (prev + 1) % managerMsgs.length);
            setIsVisible(true);
        }, SWITCH_MSG_INTERVAL ); // Switch message after 5s

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(switchTimer);
        };
    }, [currentMsgIndex, managerMsgs, isEditMode]);

    if (!managerMsgs?.length) return null;

    return (
        <section className={`manager-msgs-list ${isEditMode ? 'static-list' : ''}`}>
            {isEditMode ? (
                // Edit mode - show all messages
                managerMsgs.map((msg, idx) => (
                    <React.Fragment key={msg.id}>
                        <ManagerMsgsPreview msg={msg} isEditMode={isEditMode} onRemoveMsg={onRemoveMsg}/>
                        {idx + 1 !== managerMsgs.length && <span className="horizontal-line-divider"></span>}
                    </React.Fragment>
                ))
            ) : (
                // Display mode - show one message at a time with fade
                <div className={`message-fade ${isVisible ? 'fade-in' : 'fade-out'}`}>
                    <ManagerMsgsPreview 
                        msg={managerMsgs[currentMsgIndex]} 
                        isEditMode={isEditMode} 
                        onRemoveMsg={onRemoveMsg}
                    />
                </div>
            )}
        </section>
    )
}
