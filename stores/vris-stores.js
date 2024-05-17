import { defineStore } from 'pinia';

export const useViceStore = defineStore('vice', {
    state: () => ({
        user: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            username: '',
            access_level: '',
        }
    }),
    persist: true,
})