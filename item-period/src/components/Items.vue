<template>
    <v-card elevation="2" tile>
        <v-card-title>Items</v-card-title>
        <v-data-table

                :items-per-page="5"
                class="elevation-1"
        ></v-data-table>
        <v-card-actions>
            <v-btn>
                Удалить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Items"
    }
</script>

<style scoped>

</style>
