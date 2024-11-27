import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ManagerMsg } from '../types/Lobby';
import { lobbyService } from '../modules/lobby/services/lobby.service';
import { userService } from '../modules/user/services/user.service';
import { AppUser } from '../types/User';
import { User } from 'firebase/auth';

// Define the state and actions for the store
interface AppState {
    count: number;
    managerMsgs: ManagerMsg[];
    user: Partial<User> | AppUser | null;
    isEditMode: boolean;
    getManagerMsgs: () => void;
    addManagerMsg: (msgText: string) => void;
    getMasterAdmin: () => void;
    authenticateUser: () => void;
    logout: () => void;  
}

export const useStore = create<AppState>()(
    devtools((set) => ({
        count: 0,
        managerMsgs: [],
        user: null,
        isEditMode: false,
        getManagerMsgs: async () => {
            try {
                const managerMsgs: ManagerMsg[] = await lobbyService.getManagerMsgs();
                set(() => ({ managerMsgs })); // Correct property name
            } catch (error) {
                console.error("Failed to fetch manager messages:", error);
            }
        },
        // ManagerMsgs
        getMasterAdmin: async () => {
            const users = await userService.getMasterAdmin()
            console.log("🚀 ~ getMasterAdmin: ~ users:", users)
        },
        addManagerMsg: async (msgText) => {
            const msgToAdd = {
                text: msgText,
                timestamp: new Date()
            }
            try {
                const newMsgs = await lobbyService.modifyManagerMsgs("add", msgToAdd);
                set(() => ({ managerMsgs: newMsgs })); // Correct property name
            } catch (error) {
                console.error("Failed to add message:", error);
            }
        },
        // Auth
        authenticateUser: async () => {
            const user = await userService.authenticateUser("loby.tech.pro@gmail.com", "LobyTech2024!")
            set(() => ({ user })); 
            set(() => ({ isEditMode: true })); 
        },
        logout: () => {
            set(() => ({ user: null }))
            set(() => ({ isEditMode: false })); 
        }
    }))
);
