<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>ระบบแผนเงินบำรุง</v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {
  name: 'Logo',
  props: {
    src: {
      type: String,
      default:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Seal_of_the_Ministry_of_Public_Health_of_Thailand.svg/1024px-Seal_of_the_Ministry_of_Public_Health_of_Thailand.svg.png',
    },
    maxWidth: {
      type: String,
      default: '40%',
    },
    maxHeight: {
      type: String,
      default: '40%',
    },
  },
}
</script>
