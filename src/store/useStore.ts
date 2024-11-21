import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ManagerMsg } from '../types/Lobby';
import { lobbyService } from '../modules/lobby/services/lobby.service';

// Define the state and actions for the store
interface AppState {
    count: number;
    managerMsgs: ManagerMsg[];
    getManagerMsgs: () => void;
    decrement: () => void;
}

export const useStore = create<AppState>()(
    devtools((set) => ({
        count: 0,
        managerMsgs: [],
        getManagerMsgs: async () => {
            try {
                const managerMsgs: ManagerMsg[] = await lobbyService.getManagerMsgs();
                set(() => ({ managerMsgs })); // Correct property name
            } catch (error) {
                console.error("Failed to fetch manager messages:", error);
            }
        },
        decrement: () => set((state) => ({ count: state.count - 1 })),
    }))
);
// vercel