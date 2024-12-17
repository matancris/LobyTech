import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ManagerMsg, MediaState } from '../types/Lobby';
import { lobbyService } from '../modules/lobby/services/lobby.service';
import { userService } from '../modules/user/services/user.service';
import { AppUser, UserCredential, UserMsg } from '../types/User';
import { User } from 'firebase/auth';
import { utilService } from '@/modules/common/services/util.service';

// Define the state and actions for the store
interface AppState {
    count: number;
    managerMsgs: ManagerMsg[];
    user: Partial<AppUser> | AppUser | null;
    manager: Partial<User> | null;
    isEditMode: boolean;
    getManagerMsgs: () => void;
    addUserMsg: (msgText: string) => void;
    removeUserMsg: (msg: UserMsg) => void;
    getMasterAdmin: () => void;
    getDataFromStorage: () => void;
    getCurrUser: () => void;
    authenticateUser: () => void;
    setEditMode: (isOn: boolean) => void;
    logout: () => void;
    login: (userCred: UserCredential) => void;
    mediaState: MediaState;
    setMediaState: (id: string, state: Partial<MediaState[string]>) => void;
}

export const useStore = create<AppState>()(
    devtools((set, get) => ({
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
        getDataFromStorage: async () => {
            const loggedInUser = await userService.getLoggedInUser()
            if (!loggedInUser) return;
            set(() => ({
                user: loggedInUser
            }))
            set(() => ({ managerMsgs: loggedInUser.userMsgs }))
        },
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
            set(() => ({ managerMsgs: user.userMsgs }))
        },
        // ManagerMsgs
        addUserMsg: async (msgText) => {
            const msgToAdd = {
                id: `msg_${utilService.makeId()}`,
                text: msgText,
                timestamp: new Date()
            }
            // get user that in the store now
            const user = get().user
            if (!user) return;
            user?.userMsgs?.push(msgToAdd)
            try {
                await userService.updateUser(user);
                set(() => ({ user })); // Correct property name
                set(() => ({ managerMsgs: user.userMsgs }))
            } catch (error) {
                console.error("Failed to add message:", error);
            }
        },
        removeUserMsg: async (msg: UserMsg) => {
            const user = get().user
            if (!user) return;
            user.userMsgs = user?.userMsgs?.filter((currMsg) => currMsg.id !== msg.id)

            try {
                await userService.updateUser(user);
                set(() => ({ user })); // Correct property name
                set(() => ({ managerMsgs: user.userMsgs }))
            } catch (error) {
                console.error("Failed to remove message:", error);
            }
        },
        setEditMode: async (isOn: boolean) => {
            set(() => ({ isEditMode: isOn }));
        },

        // Auth
        login: async ({ email, password }: UserCredential) => {
            try {
                // const user = await userService.authenticateUser("loby.tech.pro@gmail.com", "LobyTech2024!")
                const authUser = await userService.authenticateUser(email, password)
                console.log("🚀 ~ login: ~ user:", authUser)
                if (!authUser) throw new Error("Authentication failed");
                const user = await userService.getUserByAuthId(authUser.uid)
                console.log("🚀 ~ login: ~ user:", user)
                set(() => ({ user })); // Correct property name
                set(() => ({ managerMsgs: user.userMsgs }))
            } catch (err) {
                console.error(err)
            }
        },
        authenticateUser: async () => {
            // const manager = await userService.authenticateUser("loby.tech.pro@gmail.com", "LobyTech2024!")
            // // set(() => ({ manager }));
            // // set(() => ({ isEditMode: true }));
        },
        logout: () => {
            userService.logout();
            set(() => ({ user: null }))
            set(() => ({ isEditMode: false }));
            set(() => ({ managerMsgs: [] }))
        }
    }))
);
