<script setup>
useHead({
    title: 'Login'
})

const emailRef = ref('')
const passwordRef = ref('')
const nameRef = ref('')
</script>

<template>
    <div class="flex items-center justify-center min-h-screen w-full">
        <div class="rounded bg-sidebar w-1/4 p-5">
            <h1 class="font-bold text-2xl text-center mb-5">Login</h1>

            <form>
                <Input placeholder="Email" type='email' class="mb-3" v-model="emailRef"/>
                <Input placeholder="Password" type='password' class="mb-3" v-model="passwordRef"/>
                <Input placeholder="Name" type='text' class="mb-3" v-model="nameRef"/>
            </form>

            <div class="flex items-center justify-center gap-5">
                <Button type="button">Login</Button>
                <Button type="button">Register</Button>
            </div>
        </div>
    </div>
</template>