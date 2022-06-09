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
        <v-list-item link to="/nutrition">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/nutrition">
          <v-list-item-action>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>รายการผู้ป่วยนอก</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'nutrition-listopd' }">
          <v-list-item-action>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>รายการผู้ป่วยใน</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/nutrition">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

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
  name: 'Nutrition',
  data: () => ({
    drawer: null,
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
