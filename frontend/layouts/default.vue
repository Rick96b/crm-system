<script setup lang="ts">
const authStore = useAuthStore()
const isLoadingStore = useIsLoadingStore()
const router = useRouter()

onMounted(async () => {
    try {
        console.log('why')
        await authStore.authByToken()
    } 
    catch(error) {
        console.log(error)
        await router.push('/login')
    } finally {
        isLoadingStore.set(false)
    }
})
</script>

<template>
    <LayoutLoader v-if="isLoadingStore.isLoading"/>
    <section v-else :class="{grid: authStore.isAuth}" style="min-height: 100vh;">
        <LayoutSidebar v-if="authStore.isAuth"/>
        <div>
            <slot />
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .grid {
        display: grid;
        grid-template-columns: 1fr 6fr;
    }
</style>