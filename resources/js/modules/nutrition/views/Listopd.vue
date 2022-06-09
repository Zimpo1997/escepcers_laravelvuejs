<template>
  <div class="py-3">
    <h1>รายการผู้เข้ารักษา</h1>
    <v-row>
      <v-col cols="8" md="8">
        <v-card>
          <v-card-title>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="เลือกวันที่รับบริการ"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card-title>
        </v-card>
        <v-divider></v-divider>
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
          <template>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="10"
              :search="search"
              :custom-filter="customSearch"
              @click:row="handleClick"
              class="elevation-1"
            ></v-data-table>
          </template>
        </v-card>
      </v-col>
      <v-col cols="4" md="4">
        <v-row>
          <v-col cols="2">
            <h2>ผู้ป่วย</h2>
          </v-col>
          <v-col cols="10" class="d-flex justify-center align-center">
            <v-btn-toggle rounded>
              <v-btn color="primary">
                <v-icon color="error">mdi-format-align-left</v-icon>
                <span>mulnutrition</span>
              </v-btn>
              <v-btn color="primary">
                <v-icon color="warning">mdi-noodles</v-icon>
                <span>สั่งอาหาร</span>
              </v-btn>
              <v-btn color="primary">
                <v-icon color="success">mdi-account-voice</v-icon>
                <span>ให้คำปรึกษา</span>
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row class="elevation-8 no-gutters pa-2 my-2 rounded">
          <v-col cols="4">
            HN:
            <b>{{ patient.hn }}</b>
          </v-col>
          <v-col cols="4">
            AN:
            <b>{{ patient.hn }}</b>
          </v-col>
          <v-col cols="4">
            Visit No:
            <b>{{ patient.hn }}</b>
          </v-col>
          <v-col cols="12">
            เลขบัตรประชาชน:
            <b>{{ patient.idcard }}</b>
          </v-col>
          <v-col cols="12">
            ชื่อ-สกุล:
            <b>{{ patient.title }}</b>
            <b>{{ patient.fname }}</b>
            <b>{{ patient.lname }}</b>
          </v-col>
          <v-col cols="">
            เพศ:
            <b>{{ patient.gender == 'M' ? 'ชาย' : 'หญิง' }}</b>
          </v-col>
          <v-col cols="">
            น้ำหนัก:
            <b>{{ patient.weight }}</b>
          </v-col>
          <v-col cols="">
            ส่วนสูง:
            <b>{{ patient.height }}</b>
          </v-col>
        </v-row>
        <h2>ผล Lab</h2>
        <v-simple-table class="elevation-1">
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  v-for="header in labheaders"
                  :key="header.value"
                  class="text-left"
                >
                  {{ header.text }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in labitems" :key="item.name">
                <td
                  v-for="header in labheaders"
                  :key="header.value"
                  v-html="item[header.value]"
                ></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'NutritionListopd',
  data: () => ({
    patient: {
      hn: null,
      title: null,
      fname: null,
      lname: null,
      idcard: null,
      gender: null,
      birthday: null,
      weight: null,
      height: null,
      diagnosis: null,
      diagnosis_description: null,
      lab: {
        Hemoglobin: null,
        Hematocrit: null,
        RBCcount: null,
        WBCcount: null,
        Pltcount: null,
        MCV: null,
        MCH: null,
        MCHC: null,
        RDW: null,
        MPV: null,
      },
    },
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
    search: '',
    labheaders: [
      { text: 'Lab', value: 'lab' },
      { text: 'ค่าปกติ', value: 'default' },
      { text: 'ค่า Lab', value: 'ptlab' },
      { text: 'ผล', value: 'ptlabresult' },
    ],
    labitems: [
      {
        lab: 'Hemoglobin',
        default: 'ผู้หญิง= 12.0 – 16.0 g /dL <br/> ผู้ชาย = 13.0 – 16.0 g/dL',
        ptlab: 12,
        ptlabresult: '<span class="red--text">ผิดปกติ</span>',
      },
      {
        lab: 'Hematocrit',
        default: 'ผู้หญิง = 36 – 46 % <br/> ผู้ชาย = 37 – 49 %',
        ptlab: 12,
        ptlabresult: '<span class="red--text">ผิดปกติ</span>',
      },
      {
        lab: 'RBC count',
        default: 'ผู้หญิง: 3.6-5.0 x106/µL <br/> ผู้ชาย= 4.7 - 6.1 x106/µL',
        ptlab: 12,
        ptlabresult: '<span class="green--text">ปกติ</span>',
      },
      {
        lab: 'WBC count',
        default: '4,000-11,000 cells/µl ',
        ptlab: 12,
        ptlabresult: 12,
      },
      {
        lab: 'Plt count',
        default: '150,000 – 400,000 cells/cumm.',
        ptlab: 12,
        ptlabresult: 12,
      },
      { lab: 'MCV', default: '78 – 98 fL', ptlab: 12, ptlabresult: 12 },
      { lab: 'MCH', default: '27.5 – 33.5 pg', ptlab: 12, ptlabresult: 12 },
      { lab: 'MCHC', default: '28 – 33 gm /dL', ptlab: 12, ptlabresult: 12 },
      { lab: 'RDW', default: '11.5 – 14.5 %', ptlab: 12, ptlabresult: 12 },
      { lab: 'MPV', default: '6 – 10 fL', ptlab: 12, ptlabresult: 12 },
    ],
    headers: [
      {
        text: 'HN',
        align: 'start',
        sortable: false,
        value: 'hn',
      },
      { text: 'ชื่อ - สกุล', value: 'title' },
      { text: 'วินิจฉัยเบื้องต้น', value: 'diagnosis_description' },
      { text: 'gender', value: 'gender' },
      { text: 'วัน/เดือน/ปีเกิด', value: 'birthday' },
    ],
    desserts: [
      {
        hn: '3452131009',
        title: 'Mr',
        fname: 'Bea',
        lname: 'Cakebread',
        idcard: '0867651628',
        gender: 'F',
        birthday: '2021-08-03',
        weight: 132,
        height: 151,
        diagnosis: 'S0122XA',
        diagnosis_description:
          'luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in',
        lab: {
          Hemoglobin: 14,
          Hematocrit: 22,
          RBCcount: 7,
          WBCcount: 29673,
          Pltcount: 273077,
          MCV: 15,
          MCH: 22,
          MCHC: 65,
          RDW: 19,
          MPV: 50,
        },
      },
      {
        hn: '2444131371',
        title: 'Mrs',
        fname: 'Pavlov',
        lname: 'Abramowsky',
        idcard: '1517775167',
        gender: 'M',
        birthday: '2021-09-19',
        weight: 142,
        height: 235,
        diagnosis: 'S55212S',
        diagnosis_description:
          'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec',
        lab: {
          Hemoglobin: 42,
          Hematocrit: 22,
          RBCcount: 2,
          WBCcount: 76141,
          Pltcount: 122694,
          MCV: 54,
          MCH: 83,
          MCHC: 18,
          RDW: 5,
          MPV: 77,
        },
      },
      {
        hn: '0595772501',
        title: 'Honorable',
        fname: 'Clementia',
        lname: 'Attard',
        idcard: '6236998361',
        gender: 'F',
        birthday: '2021-06-09',
        weight: 98,
        height: 244,
        diagnosis: 'S82131F',
        diagnosis_description:
          'ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc',
        lab: {
          Hemoglobin: 32,
          Hematocrit: 58,
          RBCcount: 6,
          WBCcount: 49205,
          Pltcount: 974427,
          MCV: 58,
          MCH: 59,
          MCHC: 92,
          RDW: 19,
          MPV: 53,
        },
      },
      {
        hn: '9210558588',
        title: 'Rev',
        fname: 'Aristotle',
        lname: 'Strickland',
        idcard: '8073003791',
        gender: 'M',
        birthday: '2022-04-06',
        weight: 133,
        height: 218,
        diagnosis: 'S6701XS',
        diagnosis_description:
          'fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in',
        lab: {
          Hemoglobin: 18,
          Hematocrit: 66,
          RBCcount: 8,
          WBCcount: 64299,
          Pltcount: 618971,
          MCV: 55,
          MCH: 8,
          MCHC: 71,
          RDW: 63,
          MPV: 40,
        },
      },
      {
        hn: '3579750224',
        title: 'Rev',
        fname: 'Worthington',
        lname: 'Jaskowicz',
        idcard: '5935137593',
        gender: 'M',
        birthday: '2021-08-13',
        weight: 135,
        height: 192,
        diagnosis: 'I69869',
        diagnosis_description:
          'dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio',
        lab: {
          Hemoglobin: 41,
          Hematocrit: 43,
          RBCcount: 10,
          WBCcount: 31365,
          Pltcount: 605054,
          MCV: 82,
          MCH: 1,
          MCHC: 45,
          RDW: 8,
          MPV: 33,
        },
      },
      {
        hn: '3176453779',
        title: 'Dr',
        fname: 'Malena',
        lname: 'Segot',
        idcard: '5960357879',
        gender: 'F',
        birthday: '2021-11-23',
        weight: 81,
        height: 201,
        diagnosis: 'V173',
        diagnosis_description:
          'parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis parturient montes nascetur',
        lab: {
          Hemoglobin: 26,
          Hematocrit: 39,
          RBCcount: 10,
          WBCcount: 40964,
          Pltcount: 165618,
          MCV: 91,
          MCH: 30,
          MCHC: 20,
          RDW: 23,
          MPV: 97,
        },
      },
      {
        hn: '5378843677',
        title: 'Mrs',
        fname: 'Sholom',
        lname: 'Agiolfinger',
        idcard: '1834401542',
        gender: 'M',
        birthday: '2021-06-24',
        weight: 66,
        height: 161,
        diagnosis: 'S06353S',
        diagnosis_description:
          'placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus',
        lab: {
          Hemoglobin: 17,
          Hematocrit: 40,
          RBCcount: 3,
          WBCcount: 73663,
          Pltcount: 911918,
          MCV: 36,
          MCH: 50,
          MCHC: 94,
          RDW: 20,
          MPV: 3,
        },
      },
      {
        hn: '9397432923',
        title: 'Rev',
        fname: 'Brock',
        lname: 'Delahunty',
        idcard: '2335308645',
        gender: 'M',
        birthday: '2021-11-05',
        weight: 73,
        height: 214,
        diagnosis: 'R4189',
        diagnosis_description:
          'maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque',
        lab: {
          Hemoglobin: 33,
          Hematocrit: 1,
          RBCcount: 8,
          WBCcount: 16793,
          Pltcount: 591237,
          MCV: 64,
          MCH: 94,
          MCHC: 8,
          RDW: 30,
          MPV: 98,
        },
      },
      {
        hn: '6112125692',
        title: 'Ms',
        fname: 'Gerty',
        lname: 'McCrackan',
        idcard: '5509139404',
        gender: 'F',
        birthday: '2022-01-17',
        weight: 144,
        height: 186,
        diagnosis: 'T43015D',
        diagnosis_description:
          'dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl',
        lab: {
          Hemoglobin: 10,
          Hematocrit: 78,
          RBCcount: 1,
          WBCcount: 6249,
          Pltcount: 269996,
          MCV: 4,
          MCH: 59,
          MCHC: 52,
          RDW: 32,
          MPV: 15,
        },
      },
      {
        hn: '9670125529',
        title: 'Mr',
        fname: 'Harman',
        lname: 'Goschalk',
        idcard: '7312962564',
        gender: 'M',
        birthday: '2022-04-18',
        weight: 91,
        height: 206,
        diagnosis: 'S62231P',
        diagnosis_description:
          'dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt',
        lab: {
          Hemoglobin: 46,
          Hematocrit: 34,
          RBCcount: 1,
          WBCcount: 83743,
          Pltcount: 146143,
          MCV: 60,
          MCH: 32,
          MCHC: 36,
          RDW: 50,
          MPV: 74,
        },
      },
    ],
  }),
  methods: {
    // ...mapActions({
    //   logout: 'LOGOUT',
    // }),
    customSearch(value, search, item) {
      return Object.values(item).some(
        (v) => v && v.toString().toLowerCase().includes(search),
      )
    },

    handleClick(value) {
      this.patient = null
      this.patient = value
      console.log(this.patient)
      //   this.checkLab(value)
    },

    checkLab(value) {
      this.patient.lab = [
        {
          Hemoglobin: 10,
          Hematocrit: 78,
          RBCcount: 1,
          WBCcount: 6249,
          Pltcount: 269996,
          MCV: 4,
          MCH: 59,
          MCHC: 52,
          RDW: 32,
          MPV: 74,
        },
      ]
    },
  },
}
</script>
