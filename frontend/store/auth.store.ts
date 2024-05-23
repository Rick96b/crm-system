interface IAuthStore {
    email: string
    name: string
    status: boolean
}

const defaultValue: {user: IAuthStore} = {
    user: {
        email: '',
        name: '',
        status: false
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: {
        isAuth: state => state.user.status
    },
    actions: {
        clear(){
            this.$patch(defaultValue)
        },
        set(inputs: IAuthStore) {
            this.$patch({user: inputs})
        }
    }
})

export const useIsLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: false
    }),
    actions: {
        set(data: boolean) {
            this.$patch({ isLoading: data })
        }
    }
})