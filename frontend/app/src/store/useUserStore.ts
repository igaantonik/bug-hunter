import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
    isOnboarded: boolean;
    setIsOnboarded: (value: boolean) => void;
    username: string | undefined;
    setUsername: (value: string | undefined) => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            isOnboarded: false,
            setIsOnboarded: (isOnboarded) => set({ isOnboarded }),
            username: undefined,
            setUsername: (username) => set({ username }),
        }),
        {
            name: 'user-storage',
        }
    )
);

export default useUserStore;
