<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ currentUser.name ? currentUser.name : '' }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-icon color="green" size="12px">mdi-circle</v-icon>
              Online
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list rounded>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-arrow-left-bold-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>กลับหน้าหลัก</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item link to="/finance">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group :value="true" prepend-icon="mdi-account-cash">
          <template v-slot:activator>
            <v-list-item-title>รายรับ</v-list-item-title>
          </template>
          <v-list-item
            v-for="([title, icon, links], i) in revenues"
            :key="i"
            link
            :to="{ name: links }"
          >
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="title"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon color="red">mdi-power</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="red--text">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ hoscode }} {{ hosname }}</v-toolbar-title>
    </v-app-bar>

    <v-main class="lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <router-view class="main-view" name="MainView"></router-view>
            <!-- <v-sheet min-height="70vh" rounded="lg">
            </v-sheet> -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Finance',
  data: () => ({
    drawer: null,
    revenues: [
      ['บันทึกใบเสร็จ', 'mdi-drag-horizontal-variant', 'finance-create'],
      [
        'รายรับปัจจุบัน',
        'mdi-drag-horizontal-variant',
        'finance-report-inhalf',
      ],
      ['รายการใบนำส่ง', 'mdi-drag-horizontal-variant', 'finance-waybill'],
      [
        'รายงานรับประจำวัน',
        'mdi-drag-horizontal-variant',
        'finance-report-day',
      ],
      [
        'รายงานรับรายเดือน',
        'mdi-drag-horizontal-variant',
        'finance-report-month',
      ],
      [
        'รายงานรับรายไตรมาส',
        'mdi-drag-horizontal-variant',
        'finance-report-quarter',
      ],
      [
        'รายงานรับรายปีงบประมาณ',
        'mdi-drag-horizontal-variant',
        'finance-report-year',
      ],
    ],
    expenses: [
      ['บันทึกการออกเช็ค', 'mdi-plus-outline'],
      ['แยกรายจ่าย', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],
  }),
  methods: {
    ...mapActions({
      logout: 'LOGOUT',
    }),
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser',
      appname: 'appname',
      hoscode: 'hoscode',
      hosname: 'hosname',
    }),
  },
}
</script>
