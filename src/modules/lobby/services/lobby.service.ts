
import { firebase } from '../../../firebase/firebase'; // Assuming you've exported db from firebase.js
import { utilService } from "../../common/services/util.service";
import { UserMsg } from "@/types/User";
const { ref, get, set, db } = firebase

const managerMsgsRef = ref(db, 'managerMsgs');

// const messages: ManagerMsg[] = [
//     { id: "msg_001", text: "The pool will be closed for cleaning on Monday afternoon.", timestamp: new Date("2024-11-20T10:44:39") },
//     { id: "msg_002", text: "The annual building meeting will be held on Saturday at 7 PM in the lobby.", timestamp: new Date("2024-11-04T10:44:39") },
//     { id: "msg_003", text: "Please remember to move your vehicles for garage cleaning on Friday.", timestamp: new Date("2024-11-04T10:44:39") },
//     { id: "msg_004", text: "Please remember to move your vehicles for garage cleaning on Friday.", timestamp: new Date("2024-10-24T10:44:39") },
//     { id: "msg_005", text: "The landscapers will be working in the garden on Wednesday morning.", timestamp: new Date("2024-11-06T10:44:39") },
//     { id: "msg_006", text: "The pool will be closed for cleaning on Monday afternoon.", timestamp: new Date("2024-11-17T10:44:39") },
//     { id: "msg_007", text: "The pool will be closed for cleaning on Monday afternoon.", timestamp: new Date("2024-11-04T10:44:39") },
//     { id: "msg_008", text: "A lost key was found in the parking area; please contact the committee.", timestamp: new Date("2024-11-12T10:44:39") },
//     { id: "msg_009", text: "A new recycling station has been set up next to the main entrance.", timestamp: new Date("2024-11-14T10:44:39") },
//     { id: "msg_010", text: "The annual building meeting will be held on Saturday at 7 PM in the lobby.", timestamp: new Date("2024-10-31T10:44:39") },
// ];

async function getManagerMsgs() {

    try {
        const snapshot = await get(managerMsgsRef);
        if (snapshot.exists()) {
            const managerMsgs = snapshot.val(); // Return the data as an object if you want to use it elsewhere in your application.
            return managerMsgs
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error(error);
    }
}


// Update an existing manager messages
// Function to handle add, remove, or update
async function modifyManagerMsgs(action: "add" | "remove" | "update", msg: UserMsg) {
    try {
        // Fetch current messages from the database
        const snapshot = await get(managerMsgsRef);
        let messages: UserMsg[] = snapshot.exists() ? snapshot.val() : [];

        if (!Array.isArray(messages)) {
            messages = [];
        }

        switch (action) {
            case "add":
                const msgToAdd = {
                    id: `msg_${utilService.makeId()}`,
                    ...msg
                }
                messages.push(msgToAdd); // Add the new message
                break;

            case "remove":
                messages = messages.filter(m => m.id !== msg.id); // Remove the message by ID
                break;

            case "update":
                messages = messages.map(m => m.id === msg.id ? { ...m, ...msg } : m); // Update the message by ID
                break;

            default:
                throw new Error("Invalid action");
        }

        // Write the updated array back to the database
        await set(managerMsgsRef, messages);
        return messages;
    } catch (error) {
        console.error(`Error performing ${action} on messages:`, error);
    }
}

export const lobbyService = {
    getManagerMsgs,
    modifyManagerMsgs,
};