<script setup lang="ts">
import { BASE_BACKEND_URL } from '~/app.constants';
import { useIsLoadingStore } from '~/store/auth.store';

useHead({
    title: 'Login'
})

const emailRef = ref('')
const passwordRef = ref('')
const loginRef = ref('')

const isLoadingStore = useIsLoadingStore()
const authStore = useAuthStore()
const router = useRouter()
const error = ref('')

const register = async () => {
    postRegister().then(async (res) => {
        localStorage.setItem('token', res.token)
        authStore.authByToken()
        await router.push('/')
    }).catch((err) => {
        error.value = 'Неправильный ввод'
    })
}

const login = async () => {
    postLogin().then(async (res) => {
        localStorage.setItem('token', res.token)
        authStore.authByToken()
        await router.push('/')
    }).catch((err) => {
        error.value = 'Неизвестный пользователь'
    })
}

const postRegister = async () => {
    return $fetch<{token: string}>(`${BASE_BACKEND_URL}/auth/signUp`, {
        method: "POST",
        body: {
            email: emailRef.value,
            password: passwordRef.value,
            login: passwordRef.value
        }
    })
}

const postLogin = async () => {
    return $fetch<{token: string}>(`${BASE_BACKEND_URL}/auth/signIn`, {
        method: "POST",
        body: {
            email: emailRef.value,
            password: passwordRef.value,
            login: passwordRef.value
        }
    })
}
</script>

<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="font-bold text-2xl text-center mb-5">Login</h1>

            <form @submit.prevent=''>
                <Input placeholder="Login" type='text' class="mb-3" v-model="loginRef"/>
                <Input placeholder="Email" type='email' class="mb-3" v-model="emailRef"/>
                <Input placeholder="Password" type='password' class="mb-3" v-model="passwordRef"/>
            </form>
            <p v-if="error" class="mt-5 mb-5">{{ error }}</p>
            <div class="flex items-center justify-center gap-5">
                <Button type="button" @click="login">Login</Button>
                <Button type="button" @click="register">Register</Button>
            </div>
        </div>
    </div>
</template>