import { defineStore } from 'pinia';

export const useViceStore = defineStore('vice', {
    state: () => ({
        user: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
        }
    }),
    persist: true,
})