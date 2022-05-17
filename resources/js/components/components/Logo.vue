<template>
  <v-img
    :lazy-src="src"
    :max-height="maxWidth"
    :max-width="maxHeight"
    :src="src"
  ></v-img>
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
