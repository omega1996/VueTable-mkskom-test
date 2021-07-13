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
      v-model="selected"
      v-bind:loading="isLoading"
      loading-text="Загрузка... Пожалуйста, подождите"
    >
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="saveInput"
          @cancel="cancelInput"
          @open="openInput"
          @close="closeInput"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.description="props">
        <v-edit-dialog
          :return-value.sync="props.item.description"
          @save="saveInput"
          @cancel="cancelInput"
          @open="openInput"
          @close="closeInput"
        >
          {{ props.item.description }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.description"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>

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
      <v-btn color="red" @click="deleteItems" dark> Удалить </v-btn>
      <v-btn color="success" @click="saveAll" :disabled="canSave" > Сохранить </v-btn>
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
    async deleteItems() {
      for (let item of this.selected) {
        await ItemsService.deleteItem(item.id);
      }
      await this.initialize();
    },
    openInput(){
    },
    cancelInput(){
    },
    saveInput(){
      this.canSave=false;
    },
    closeInput(){
    },
    async save() {
      await ItemsService.addItem(
        this.editedItem.name,
        this.editedItem.description
      );
      await this.initialize();
      this.close();
    },
    async saveAll() {

      for (let item of this.items){
        await ItemsService.updateItem(item)
      }
      await this.initialize();
      this.canSave = true
    },
  },
  data: () => ({
    canSave: true,
    selected: [],
    dialog: false,
    isLoading: true,
    editedItem: {
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
