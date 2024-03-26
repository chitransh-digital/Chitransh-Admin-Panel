import { create } from "zustand"

export const useUserState = create(set => ({
    isLoggedIn : false,
    setIsLoggedIn : () => set(state => ({...state, isLoggedIn : true})),
    unsetIsLoggedIn : () => set(state => ({...state, isLoggedIn : false})),
}))