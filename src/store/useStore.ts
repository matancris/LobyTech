import { create } from 'zustand';
import { composeWithDevTools } from 'redux-devtools-extension'
import { devtools } from 'zustand/middleware';

// Define the state and actions for the store
interface AppState {
    count: number;
    increment: () => void;
    decrement: () => void;
}

export const useStore = create<AppState>()(
    devtools((set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
    }))
);
