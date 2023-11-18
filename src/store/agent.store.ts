import { create } from "zustand";

type State = {
    isSubmitingLoadingFormAgent : boolean,
    agents : any[],
}

type Action = {
    setIsSubmitingLoading: (isSubmitingLoadingFormAgent: boolean) => void,
    setAgents: (agents: any[]) => void,
}

const AgentStore = create<State & Action> ((set) => ({
    isSubmitingLoadingFormAgent: false,
    agents: [],
    setIsSubmitingLoading: (isSubmitingLoadingFormAgent: boolean) => set({ isSubmitingLoadingFormAgent }),
    setAgents: (agents: any[]) => set({ agents }),
}));

export default AgentStore;