<script setup lang="ts">

</script>

<template>
    <aside class="px-5 py-8 bg-sidebar h-full relative w-full">
        <NuxtLink to="/" class="mb-10 block">
            <NuxtImg src="/logo.svg" alt="Home" width="100px" class="mx-auto"/>
        </NuxtLink>
        <button class="absolute top-2 right-3 transition-colors hover:text-primary">
            <Icon name="line-md:logout" size='18px'/>
        </button>
        <LayoutMenu />
    </aside>
</template>

<style lang="scss" scoped>
    
</style>