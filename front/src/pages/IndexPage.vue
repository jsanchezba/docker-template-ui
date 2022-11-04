<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue'
import { QTableColumn } from 'quasar';
import axios from 'axios'

onMounted(async () => fetch())

const columns: Ref<QTableColumn[]> = ref([
    {
        name: 'status',
        label: 'Status',
        field: (row) => row.status
    },
    {
        name: 'name',
        label: 'Name',
        field: (row) => row.name
    },
    {
        name: 'ports',
        label: 'Ports',
        field: (row) => row.ports
    },
    {
        name: 'actions',
        label: 'Actions',
        field: () => 'div'
    }
])

const data = ref()
async function fetch() {
    const result = await axios.get('/api/list')
    data.value = result.data
}

async function clone() {
    await axios.get('/api/clone');
    await fetch()
}
</script>

<template>
    <q-page class="row items-center justify-evenly">
        <q-card class="q-pa-md">
            <q-card-actions>
                <q-space />
                <q-btn label="Clone" @click="clone" />
            </q-card-actions>
            <q-table :columns="columns" :rows="data">
                <template #body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense flat icon="play_arrow" />
                        <q-btn dense flat icon="delete" />
                    </q-td>
                </template>
            </q-table>
        </q-card>
    </q-page>
</template>


<style lang="scss" scoped>
.q-card {
    width: 900px
}
</style>
