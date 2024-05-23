import { BASE_BACKEND_URL } from "~/app.constants"

interface IAuthStore {
    email: string
    name: string
    password: string
}

const defaultValue: {user: IAuthStore, status: boolean} = {
    user: {
        email: '',
        name: '',
        password: ''
    },
    status: false
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: {
        isAuth: state => state.status
    },
    actions: {
        clear(){
            this.$patch(defaultValue)
        },
        set(inputs: IAuthStore) {
            this.$patch({user: inputs, status: true})
        },
        async authByToken() {
            const token = localStorage.getItem('token')
            if(token) {
                return $fetch<IAuthStore>(`${BASE_BACKEND_URL}/auth/authToken`, {
                    method: "POST",
                    body: {token: token}
                }).then(user => this.$patch({user: user, status: true}))
            } else {
                throw new Error('No token existing')
            }

        }
    }
})

export const useIsLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: true
    }),
    actions: {
        set(data: boolean) {
            this.$patch({ isLoading: data })
        }
    }
})