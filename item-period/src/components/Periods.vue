<template>
  <v-card elevation="2" tile>
    <v-card-title>Periods</v-card-title>
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
              hint="чтобы изменить, нажмите Enter"
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
              hint="чтобы изменить, нажмите Enter"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>

    <table-actions
      v-on:save="save"
      :canSave="canSave"
      :deleteItems="deleteItems"
      :saveAll="saveAll"
    ></table-actions>
  </v-card>
</template>

<script>
import PeriodsService from "../services/PeriodsService.js"
import TableActions from "./TableActions.vue";
export default {
  name: "Periods",
  components: { TableActions },
  created() {
    this.initialize();
  },
  methods: {
    dialogChange() {},
    async initialize() {
      await PeriodsService.getItems().then((items) => {
        (this.items = items), (this.isLoading = false);
      });
    },

    async deleteItems() {
        this.isLoading = true;
      for (let item of this.selected) {
        await PeriodsService.deleteItem(item.id);
      }
      await this.initialize();
    },
    openInput() {},
    cancelInput() {},
    saveInput() {
        
      this.canSave = false;
    },
    closeInput() {},
    async save(editedItem) {
        this.isLoading = true;
      await PeriodsService.addItem(editedItem.name, editedItem.description);
      await this.initialize();
    },
    async saveAll() {
        this.isLoading = true;
      for (let item of this.items) {
        await PeriodsService.updateItem(item);
      }
      await this.initialize();
      this.canSave = true;
    },
  },
  data: () => ({
    canSave: true,
    selected: [],

    isLoading: true,

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
