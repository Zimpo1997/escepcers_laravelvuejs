<template>
  <v-app id="inspire" style="background-color: #e0e0e0;">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div class="d-flex justify-center mb-2">
            <Logo maxWidth="30%" maxHeight="30%" />
          </div>
          <div class="d-flex justify-center mb-1">
            <h2 class="font-weight-bold">
              ระบบแผนเงินบำรุงระดับโรงพยาบาล
            </h2>
          </div>
          <div class="d-flex justify-center mb-2">
            <h3 class="font-weight-bold">
              โรงพยาบาลคีรีมาศ
            </h3>
          </div>

          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>เข้าสู่ระบบ</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-text-field
                  prepend-icon="mdi-account-circle"
                  v-model="form.username"
                  :rules="usernameRules"
                  :counter="45"
                  label="Username"
                  :error-message="errors.username"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  v-model="form.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  label="Password"
                  hint="At least 8 characters"
                  counter
                  :error-message="errors.password"
                  autocomplete="on"
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="#006738" class="white--text" @click="doLogin">
                <span class="font-weight-bold">
                  เข้าสู่ระบบ
                </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Logo from './../../components/Logo.vue'
export default {
  name: 'Login',
  components: {
    Logo,
  },
  data() {
    return {
      valid: true,
      show1: false,
      form: {
        username: 'benz00',
        password: '123456789',
        device_name: 'browser',
      },
      errors: {},

      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) =>
          (v && v.length <= 45) || 'Username must be less than 45 characters',
      ],
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => (v && v.length >= 8) || 'Min 8 characters',
      },
    }
  },
  methods: {
    doLogin() {
      this.isLoading = 'red'
      axios
        .post('/api/login', this.form)
        .then((response) => {
          localStorage.setItem('token', response.data)

          this.$refs.loginForm.reset()
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
