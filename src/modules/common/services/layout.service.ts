import { firebase } from '../../../firebase/firebase';
import { LayoutConfig } from '../../../types/Layout';

export const layoutService = {
    async getLayouts() {
        const layoutsRef = firebase.ref(firebase.db, 'layouts');
        const snapshot = await firebase.get(layoutsRef);
        return snapshot.val() as LayoutConfig[];
    },

    async saveLayout(layout: LayoutConfig) {
        const layoutRef = firebase.ref(firebase.db, `layouts/${layout.id}`);
        await firebase.set(layoutRef, layout);
    },

    async getLayoutById(id: string) {
        const layoutRef = firebase.ref(firebase.db, `layouts/${id}`);
        const snapshot = await firebase.get(layoutRef);
        return snapshot.val() as LayoutConfig;
    }
}; 