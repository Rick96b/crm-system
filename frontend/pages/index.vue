<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const {data, isLoading, refetch} = useKanbanQuery()
console.log(data)
</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM system</h1>
        <div>
            <Card class="mb-3" draggable="true">
                <CardHeader role="button">Name</CardHeader>
                <CardContent>Company</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        </div>
    </div>
</template>