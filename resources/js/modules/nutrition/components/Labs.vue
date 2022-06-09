<template>
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
        <tr v-for="(item, i) in labitems" :key="i">
          <td
            v-for="(header, i) in labheaders"
            :key="i"
            v-html="item[header.value]"
          ></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  name: 'Labs',
  props: {
    labs: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    labheaders: [
      { text: 'Lab', value: 'lab' },
      { text: 'ค่าปกติ', value: 'default' },
      { text: 'ค่า Lab', value: 'ptlab' },
      { text: 'ผล', value: 'ptlabresult' },
    ],
    labitems: [{ lab: '', default: '', ptlab: '', ptlabresult: '' }],
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
  }),
  computed: {},
  watch: {
    labs() {
      //   console.log(this.labs)
      //   this.labitems = this.labs.map((retsurn) => {
      //     console.log(this.labs)
      //   })
      //   this.labitems = this.labs.map((lab) => {
      //   return {
      //     lab: lab.lab,
      //     default: lab.default,
      //     ptlab: lab.ptlab,
      //     ptlabresult: lab.ptlabresult,
      //   }
      //   })
    },
  },
}
</script>
