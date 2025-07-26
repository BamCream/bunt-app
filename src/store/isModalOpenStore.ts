import { create } from "zustand";

interface isModalOpenStore {
    modalOpen: boolean;
    setModalOpen: (val: boolean) => void;
}
export const useIsModalOpenStore = create<isModalOpenStore>((set) => ({
    modalOpen: false,
    setModalOpen: (val: boolean) => set({ modalOpen: val }),
}));
