import { create } from 'zustand'

type BidModalStore = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useBidModal = create<BidModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))