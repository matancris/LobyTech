
import { ManagerMsg } from "../../../types/Lobby";

const messages: ManagerMsg[] = [
    { id: "msg_001", text: "The pool will be closed for cleaning on Monday afternoon.", timestamp: new Date("2024-11-20T10:44:39") },
    { id: "msg_002", text: "The annual building meeting will be held on Saturday at 7 PM in the lobby.", timestamp: new Date("2024-11-04T10:44:39") },
    { id: "msg_003", text: "Please remember to move your vehicles for garage cleaning on Friday.", timestamp: new Date("2024-11-04T10:44:39") },
    { id: "msg_004", text: "Please remember to move your vehicles for garage cleaning on Friday.", timestamp: new Date("2024-10-24T10:44:39") },
    { id: "msg_005", text: "The landscapers will be working in the garden on Wednesday morning.", timestamp: new Date("2024-11-06T10:44:39") },
    { id: "msg_006", text: "The pool will be closed for cleaning on Monday afternoon.", timestamp: new Date("2024-11-17T10:44:39") },
    { id: "msg_007", text: "The pool will be closed for cleaning on Monday afternoon.", timestamp: new Date("2024-11-04T10:44:39") },
    { id: "msg_008", text: "A lost key was found in the parking area; please contact the committee.", timestamp: new Date("2024-11-12T10:44:39") },
    { id: "msg_009", text: "A new recycling station has been set up next to the main entrance.", timestamp: new Date("2024-11-14T10:44:39") },
    { id: "msg_010", text: "The annual building meeting will be held on Saturday at 7 PM in the lobby.", timestamp: new Date("2024-10-31T10:44:39") },
];

function getManagerMsgs() {
    return Promise.resolve(messages)
}

export const lobbyService = {
    getManagerMsgs
};