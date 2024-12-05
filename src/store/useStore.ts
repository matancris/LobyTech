import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ManagerMsg, MediaState } from '../types/Lobby';
import { lobbyService } from '../modules/lobby/services/lobby.service';
import { userService } from '../modules/user/services/user.service';
import { AppUser } from '../types/User';
import { User } from 'firebase/auth';

// Define the state and actions for the store
interface AppState {
    count: number;
    managerMsgs: ManagerMsg[];
    user: Partial<AppUser> | AppUser | null;
    manager: Partial<User> | null;
    isEditMode: boolean;
    getManagerMsgs: () => void;
    addManagerMsg: (msgText: string) => void;
    getMasterAdmin: () => void;
    getCurrUser: () => void;
    authenticateUser: () => void;
    logout: () => void;  
    mediaState: MediaState;
    setMediaState: (id: string, state: Partial<MediaState[string]>) => void;
}

export const useStore = create<AppState>()(
    devtools((set) => ({
        count: 0,
        managerMsgs: [],
        manager: null,
        user: null,
        isEditMode: false,
        mediaState: {},
        setMediaState: (id, state) =>
            set((store) => ({
                mediaState: {
                    ...store.mediaState,
                    [id]: {
                        ...store.mediaState[id],
                        ...state,
                    },
                },
            })),
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
        getCurrUser: async () => {
            const user = await userService.getCurrUser()
            set(() => ({ user })); 
        },
        // ManagerMsgs
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
            const manager = await userService.authenticateUser("loby.tech.pro@gmail.com", "LobyTech2024!")
            set(() => ({ manager })); 
            set(() => ({ isEditMode: true })); 
        },
        logout: () => {
            set(() => ({ manager: null }))
            set(() => ({ isEditMode: false })); 
        }
    }))
);
