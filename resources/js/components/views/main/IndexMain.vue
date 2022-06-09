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
              {{ currentUser ? currentUser.name : '' }}
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
        <v-list-item link to="/dashboard">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/finance">
          <v-list-item-action>
            <v-icon>mdi-cash-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Finance</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/nutrition">
          <v-list-item-action>
            <v-icon>mdi-noodles</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Nutrition</v-list-item-title>
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

      <v-toolbar-title>
        {{ hoscode ? hoscode : '' }} {{ hosname ? hosname : '' }} ::
        {{ appname ? appname : '' }} ::
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <router-view class="main-view" name="MainView"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
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
  created() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.$store.getters.token}`
    axios.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'
    this.$store.dispatch('getCurrentUser').then((res) => {
      this.$store.dispatch('autoSignIn', res)
    })
  },
}
</script>
