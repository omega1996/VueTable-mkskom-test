<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <v-spacer></v-spacer>
            <v-tabs
                    v-model="tab"
                    align-with-title
            >
                <v-tab v-for="item in content" :key="item.id">
                    {{item.name}}

                </v-tab>

            </v-tabs>
        </v-app-bar>

        <v-main>
            <v-tabs-items v-model="tab">

                <v-tab-item>
                    <Items></Items>
                </v-tab-item>
                <v-tab-item>
                    <Periods></Periods>
                </v-tab-item>
                <v-tab-item>
                    <ItemsPeriods></ItemsPeriods>
                </v-tab-item>


            </v-tabs-items>
        </v-main>
    </v-app>
</template>

<script>
    import Items from "./components/Items";
    import ItemsPeriods from "./components/ItemsPeriods";
    import Periods from "./components/Periods";

    export default {
        name: 'App',

        components: {
            Items,
            ItemsPeriods,
            Periods

        },

        data: () => ({
            tab: null,
            content: [
                {
                    'id': 0,
                    'name': 'Items',
                },
                {'id': 1, 'name': 'Periods'},
                {'id': 2, 'name': 'Dashboard'}]
        }),
    };
</script>
