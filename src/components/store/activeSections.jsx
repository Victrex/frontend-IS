import {create} from 'zustand';

export const useActiveSections = create((set) => ({
    activeAdminSection: '0',
    setActiveAdminSection: (section) => set({activeAdminSection: section}),

}))
    