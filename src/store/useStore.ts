import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ManagerMsg, MediaState } from '../types/Lobby';
import { lobbyService } from '../modules/lobby/services/lobby.service';
import { userService } from '../modules/user/services/user.service';
import { AppUser, UserCredential, UserMsg } from '../types/User';
import { User } from 'firebase/auth';
import { utilService } from '../modules/common/services/util.service';
import { DEFAULT_MEDIA_STATE } from '../config/media.config';

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
            set((store) => {
                const newMediaState = {
                    ...store.mediaState,
                    [id]: {
                        ...store.mediaState[id],
                        ...state,
                    },
                } as MediaState;
                
                // Save media state through userService
                userService.saveMediaState(newMediaState);
                return { mediaState: newMediaState };
            }),

        getDataFromStorage: async () => {
            const loggedInUser = await userService.getLoggedInUser()
            if (!loggedInUser) {
                return;
            }
            
            // Set user data
            set((state) => ({
                ...state,
                user: loggedInUser,
                managerMsgs: loggedInUser.userMsgs
            }));
            
            // Handle media state
            await initializeMediaState(loggedInUser, set);
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
                const authUser = await userService.authenticateUser(email, password)
                if (!authUser) throw new Error("Authentication failed");
                
                const user = await userService.getUserByAuthId(authUser.uid)
                if (!user) throw new Error("User data not found");

                // Set user data
                set((state) => ({
                    ...state,
                    user,
                    managerMsgs: user.userMsgs
                }));

                // Handle media state
                await initializeMediaState(user, set);
            } catch (err) {
                console.error('Login failed:', err)
            }
        },
        authenticateUser: async () => {
            // const manager = await userService.authenticateUser("loby.tech.pro@gmail.com", "LobyTech2024!")
            // // set(() => ({ manager }));
            // // set(() => ({ isEditMode: true }));
        },
        logout: () => {
            userService.logout();
            // Clear all relevant state in one update
            set((state) => ({ 
                ...state,
                user: null,
                isEditMode: false,
                managerMsgs: [],
                mediaState: {},
            }));
        }
    }))
);

// Helper function to initialize media state
async function initializeMediaState(_user: AppUser, set: any) {
    const savedMediaState = await userService.loadMediaState();
    if (savedMediaState) {
        set(() => ({ mediaState: savedMediaState }));
        return;
    }

    set(() => ({ mediaState: DEFAULT_MEDIA_STATE }));
    await userService.saveMediaState(DEFAULT_MEDIA_STATE);
}
