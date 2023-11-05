import { create } from "zustand";

type State = {
    isSubmitingLoading : boolean,
    isAuthentificated : boolean,
    companies : any[],
}

type Action = {
    setIsSubmitingLoading: (isSubmitingLoading: boolean) => void,
    setIsAuthentificated: (isAuthentificated: boolean) => void,
    setCompanies: (companies: any[]) => void,
}

const CompanyStore = create<State & Action> ((set) => ({
    isSubmitingLoading: false,
    isAuthentificated: false,
    companies: [],
    setIsSubmitingLoading: (isSubmitingLoading: boolean) => set({ isSubmitingLoading }),
    setIsAuthentificated: (isAuthentificated: boolean) => set({ isAuthentificated }),
    setCompanies: (companies: any[]) => set({ companies }),
}));

export default CompanyStore;