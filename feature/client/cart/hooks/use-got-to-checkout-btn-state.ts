import {create} from "zustand/index";

type Store = {
    disable: boolean
    setDisable: (payload: boolean) => void;
}

export const useGotToCheckoutBtnState = create<Store>(set => ({
    disable: true,
    setDisable: (payload) => (set(() => ({disable: payload}))),
}))