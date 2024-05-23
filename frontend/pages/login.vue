<script setup>
import { BASE_BACKEND_URL } from '~/app.constants';
import { useIsLoadingStore } from '~/store/auth.store';

useHead({
    title: 'Login'
})

const emailRef = ref('')
const passwordRef = ref('')
const loginRef = ref('')

const isLoadingStore = useIsLoadingStore()
const router = useRouter()

const register = async () => {
    isLoadingStore.set(true)
    await postRegister().then(async (res) => {
        localStorage.setItem('token', res.token)
        await router.push('/')
        isLoadingStore.set(false)
    })
}

const login = async () => {
    isLoadingStore.set(true)
    await postLogin().then(async (res) => {
        localStorage.setItem('token', res.token)
        await router.push('/')
        isLoadingStore.set(false)
    })
}

const postRegister = async () => {
    return $fetch(`${BASE_BACKEND_URL}/auth/signUp`, {
        method: "POST",
        body: {
            email: emailRef.value,
            password: passwordRef.value,
            login: passwordRef.value
        }
    })
}

const postLogin = async () => {
    return $fetch(`${BASE_BACKEND_URL}/auth/signIn`, {
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

            <form>
                <Input placeholder="Login" type='text' class="mb-3" v-model="loginRef"/>
                <Input placeholder="Email" type='email' class="mb-3" v-model="emailRef"/>
                <Input placeholder="Password" type='password' class="mb-3" v-model="passwordRef"/>
            </form>

            <div class="flex items-center justify-center gap-5">
                <Button type="button" @click="login">Login</Button>
                <Button type="button" @click="register">Register</Button>
            </div>
        </div>
    </div>
</template>