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
      v-bind:loading="isLoading"
      loading-text="Загрузка... Пожалуйста, подождите"
    ></v-data-table>
    <v-card-actions>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Добавить
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Добавить Item</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.name"
                    label="name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.description"
                    label="description"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Отменить </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Сохранить </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer></v-spacer>
      <v-btn color="red" dark> Удалить </v-btn>
      <v-btn color="green" dark> Сохранить </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ItemsService from "../services/ItemsService";

export default {
  name: "Items",
  created() {
    this.initialize();
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    async initialize() {
      await ItemsService.getItems().then((items) => {
        (this.items = items), (this.isLoading = false);
      });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      } else {
        this.items.push(this.editedItem);
      }
      this.close();
    },
  },
  data: () => ({
    dialog: false,
    isLoading: true,
    editedItem: {
      id: 0,
      name: "",
      description: "",
    },
    defaultItem: {
      id: 0,
      name: "",
      description: "",
    },
    headers: [
      {
        text: "id",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Description", value: "description" },
    ],
    items: [],
  }),
};
</script>

<style scoped>
</style>
