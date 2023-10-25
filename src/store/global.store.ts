import { create } from "zustand";

type State = {
    isSubmitingLoading : boolean,
    isAuthentificated : boolean,
}

type Action = {
    setIsSubmitingLoading: (isSubmitingLoading: boolean) => void,
    setIsAuthentificated: (isAuthentificated: boolean) => void,
}

const HomeStore = create<State & Action> ((set) => ({
    isSubmitingLoading: false,
    isAuthentificated: false,
    setIsSubmitingLoading: (isSubmitingLoading: boolean) => set({ isSubmitingLoading }),
    setIsAuthentificated: (isAuthentificated: boolean) => set({ isAuthentificated }),
}));

export default HomeStore;