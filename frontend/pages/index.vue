<script setup lang="ts">
import type { ICard, IColumn } from '~/components/kanban/kanban.types';
import { useKanbanQuery } from '~/components/kanban/useKanbanQuery';
import dayjs from 'dayjs'
import { useMutation } from '@tanstack/vue-query';
import type { EnumStatus } from '~/types/orders.types';
import { BASE_BACKEND_URL } from '~/app.constants';

const dragCardRef = ref<ICard | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const {data, isLoading, refetch} = useKanbanQuery()

interface MutationVariables {
    docId: string
    status?: EnumStatus
}

const { mutate } = useMutation({
    mutationKey: ['move card'],
    mutationFn: ({docId, status}: MutationVariables) => 
    $fetch(`${BASE_BACKEND_URL}/order/changeStatus`, {
        method: "PUT",
        body: {
            orderId: docId,
            newStatus: status
        }
    }),
    onSuccess: () => {
        refetch()
    }
})

function handleDragStart(card: ICard, column: IColumn) {
	dragCardRef.value = card
	sourceColumnRef.value = column
}

function handleDragOver(event: DragEvent) {
	event.preventDefault()
}

function handleDrop(targetColumn: IColumn) {
    console.log(dragCardRef.value && sourceColumnRef.value)
	if (dragCardRef.value && sourceColumnRef.value) {
		mutate({ docId: dragCardRef.value.id, status: targetColumn.id })
	}
}
</script>

<template>
    <div class="p-10">
        <h1 class="font-bold text-2xl mb-10">CRM system</h1>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="grid grid-cols-5 gap-16">
                <div v-for="(column, index) in data" :key="column.id" @dragover="handleDragOver" @drop="() => handleDrop(column)">
                    <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center">
                        {{ column.name }}
                    </div>
                    <div>
                        <KanbanCreateOrder :refetch="refetch" :status="column.id"/>
                        <Card class="mb-3" draggable="true" v-for="card in column.items" :key="card.id" @dragstart="() => handleDragStart(card, column)">
                            <CardHeader role="button">
                                <CardTitle>{{ card.name }}</CardTitle>
                                <CardDescription>{{  convertCurrency(card.price) }}</CardDescription>
                            </CardHeader>
                            <CardContent class="'text-xs'">Компания {{ card.companyName }}</CardContent>
                            <CardFooter>{{ dayjs(card.$createdAt).format('DD MMMM YYYY')}}</CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>