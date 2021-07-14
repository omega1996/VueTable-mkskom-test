<template>
  <v-card-actions>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Добавить </v-btn>
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
    <v-btn color="success" @click="saveAll" :disabled="canSave">
      Сохранить
    </v-btn>
  </v-card-actions>
</template>
<script>
export default {
  name: "TableActions",
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  data: () => ({
    dialog: false,
    editedItem: {
      name: "",
      description: "",
    },
  }),
  methods: {
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      this.$emit("save", this.editedItem);
      this.close();
    },
  },
  props: ["deleteItems", "saveAll", "canSave"],
};
</script>
