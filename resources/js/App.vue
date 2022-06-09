<template>
  <div id="MyApp">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  setup() {},
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
}
</script>
