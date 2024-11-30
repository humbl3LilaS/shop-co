import {create} from "zustand";

type Store = {
    activeSession: "details" | "reviews" | "faqs"
    setSection: (payload: "details" | "reviews" | "faqs") => void;
}

export const useChangeSection = create<Store>(set => ({
    activeSession: "faqs",
    setSection: (payload) => (set(() => ({activeSession: payload}))),
}))

