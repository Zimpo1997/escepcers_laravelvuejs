<template>
  <div class="py-3" color="red" width="100%">
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            @click:row="ClickRow"
          >
            <template slot="body.append">
              <tr class="pink--text">
                <th class="title" colspan="2">Totals</th>
                <th class="title">{{ sumCan_to_withdraw() }}</th>
                <th class="title">{{ sumCant_to_withdraw() }}</th>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" order-sm="first">
        <v-sheet rounded="lg" class="pa-4">
          <v-text-field v-model="data.indate" label="วันที่"></v-text-field>
          <v-text-field v-model="data.order" label="รายการ"></v-text-field>
          <v-text-field
            v-model.number="data.can_to_withdraw"
            type="number"
            label="เบิกได้"
          ></v-text-field>
          <v-text-field
            v-model.number="data.cant_to_withdraw"
            type="number"
            label="เบิกไม่ได้"
          ></v-text-field>
          <v-row v-if="btnState">
            <v-col>
              <v-btn block color="primary" @click="addItem">
                เพิ่มรายการ
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="btnState == false">
            <v-col>
              <v-btn block color="warning" @click="updateItem">
                แก้ไขรายการ
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block color="error" @click="deleteItem"> ลบรายการ </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center">
              ต้องการลบรายการนี้หรือไม่ ?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "FinanceCreate",
  data() {
    return {
      dialogDelete: false,
      btnState: true,
      data: {
        indate: "",
        order: "",
        can_to_withdraw: null,
        cant_to_withdraw: null,
      },
      search: "",
      headers: [
        {
          text: "วันที่",
          align: "strat",
          filterable: false,
          value: "indate",
          width: "15%",
        },
        { text: "รายการ", value: "order" },
        { text: "เบิกได้", value: "can_to_withdraw", width: "20%" },
        { text: "เบิกไม่ได้", value: "cant_to_withdraw", width: "20%" },
      ],
      desserts: [],
      clickIndex: null,
    };
  },
  methods: {
    sumCan_to_withdraw() {
      const sumall = this.desserts
        .map((item) => item.can_to_withdraw)
        .reduce((prev, curr) => prev + curr, 0);
      return sumall;
    },
    sumCant_to_withdraw() {
      const sumall = this.desserts
        .map((item) => item.cant_to_withdraw)
        .reduce((prev, curr) => prev + curr, 0);
      return sumall;
    },
    resetState() {
      this.btnState = true;
      this.dialogDelete = false;
      this.clickIndex = null;
      this.data = {
        indate: "",
        order: "",
        can_to_withdraw: null,
        cant_to_withdraw: null,
      };
    },
    addItem() {
      this.desserts.push(this.data);
      this.resetState();
    },
    updateItem() {
      this.desserts.splice(this.clickIndex, 1, this.data);
      this.resetState();
    },
    deleteItem(item) {
      this.dialogDelete = true;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.clickIndex, 1);
      this.resetState();
    },
    ClickRow(e, i) {
      this.btnState = false;
      this.clickIndex = i.index;
      this.data = {
        indate: e.indate,
        order: e.order,
        can_to_withdraw: e.can_to_withdraw,
        cant_to_withdraw: e.cant_to_withdraw,
      };
    },
  },
};
</script>
