import { create } from "zustand";

type State = {
    isOpenModalAdd : boolean,
    customers : any[],
}

type Action = {
    setIsOpenModalAdd: (isOpenModalAdd: boolean) => void,
    setCustomers: (customers: any[]) => void,
}

const CustomerStore = create<State & Action> ((set) => ({
    isOpenModalAdd: false,
    customers: [],
    setIsOpenModalAdd: (isOpenModalAdd: boolean) => set({ isOpenModalAdd }),
    setCustomers: (customers: any[]) => set({ customers }),
}));

export default CustomerStore;