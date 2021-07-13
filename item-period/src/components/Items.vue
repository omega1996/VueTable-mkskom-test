<template>
    <v-card elevation="2" tile>
        <v-card-title>Items</v-card-title>
        <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                class="elevation-1"
                item-key="id"

                show-select
        ></v-data-table>
        <v-card-actions>
            <v-btn color="red" dark>
                Удалить
            </v-btn>
            <v-btn color="primary"
              dark>
                Добавить
            </v-btn>
            <v-btn color="green"
              dark>
                Сохранить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Items",
        data () {
            return {
                headers: [
                    {
                        text: 'id',
                        align: 'start',
                        sortable: true,
                        value: 'id',
                    },
                    { text: 'Name', value: 'name' },
                    { text: 'Description', value: 'description' },
                ],
                items: [
                    {
                        id: 1,
                        name: 'hello',
                        description: 'world',

                    },
                    {
                        id: 2,
                        name: 'not-hello',
                        description: 'world',

                    },
                    {
                        id: 3,
                        name: 'hello',
                        description: 'world',

                    },
                ],
            }
        },
    }
</script>

<style scoped>

</style>
