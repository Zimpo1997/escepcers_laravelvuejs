<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ currentUser.name }}</v-list-item-title>
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

        <!-- <v-list-group :value="true" prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>รายจ่าย</v-list-item-title>
          </template>
          <v-list-item
            v-for="([title, icon, links], i) in expenses"
            :key="i"
            link
            :to="{ name: links }"
          >
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="title"></v-list-item-title>
          </v-list-item>
        </v-list-group> -->
        <!-- <v-list-group :value="true" prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-group :value="true" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="([title, icon], i) in admins" :key="i" link>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="([title, icon], i) in cruds" :key="i" link>
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group> -->

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
      <v-toolbar-title>ระบบแผนเงินบำรุง</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-3">
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
    currentUser: {},
    token: localStorage.getItem('token'),
  }),
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT').then((res) => {
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
    },
    getUser() {
      axios
        .get('/api/user')
        .then((response) => {
          this.currentUser = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
  },
  created() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'
    this.getUser()
  },
}
</script>
