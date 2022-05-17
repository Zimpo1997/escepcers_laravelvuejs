<template>
  <div class="py-3">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link :to="{ name: 'finance' }">
          Finance
        </router-link>
      </li>
      <li class="breadcrumb-item active">
        {{ person.name }}
      </li>
    </ol>
    <h1>{{ person.name }}</h1>
    <div>
      <i class="fa fa-phone" />
      <img :src="person.image" alt="" />
      <div>
        {{ person.phone }}
      </div>
      <div>
        {{ person.function }}
      </div>
      <router-link
        :to="{ name: 'finance-edit', params: { id: person.id } }"
        class="btn btn-info"
      >
        edit
      </router-link>
      <a href="#" class="btn btn-danger" @click.prevent="removePerson()">
        remove
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinanceDetails',
  computed: {
    person() {
      return this.$store.getters['finance/getItem'](this.$route.params)
    },
  },
  methods: {
    removePerson() {
      this.$store.dispatch('finance/removePerson', this.person.id)
      this.$router.push({
        name: 'finance-welcome',
      })
    },
  },
}
</script>
