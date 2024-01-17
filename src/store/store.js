import { create } from "zustand"

export const useUserState = create(set => ({
    isLoggedIn : false,
    hospitalData : null,
    setIsLoggedIn : () => set(state => ({...state, isLoggedIn : true})),
    unsetIsLoggedIn : () => set(state => ({...state, isLoggedIn : false})),
    setHospitalData : (data) => set(state => ({...state, hospitalData : data})),
}))
