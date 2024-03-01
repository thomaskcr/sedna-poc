import { create } from 'zustand'
import { persist } from "zustand/middleware";

let store = (set) => ({
    username: null,
    displayName: null,
    email: null,
    token: null,
    signedIn: false,

    setUser: (jwtToken, payload) => set(() => ({
        // Username is the user part of email, to lower
        username: payload.email.split("@")[0].toLowerCase(),
        displayName: payload.given_name + " " + payload.family_name,
        email: payload.email.toLowerCase(),

        token: jwtToken,

        signedIn: true
    })),

    clearUser: () => set(() => ({
        username: null,
        displayName: null,
        email: null,
        token: null,
        signedIn: false
    })),
})

store = persist(store, { name: "user_settings" })
const userStore = create(store);

export default userStore;