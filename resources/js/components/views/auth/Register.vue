<template>
  <v-app id="inspire" style="background-color: #e0e0e0;">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div class="d-flex justify-center mb-2">
            <Logo maxWidth="30%" maxHeight="30%" />
          </div>
          <div class="d-flex justify-center mb-1">
            <h2 class="font-weight-bold">ระบบแผนเงินบำรุงระดับโรงพยาบาล</h2>
          </div>
          <div class="d-flex justify-center mb-2">
            <h3 class="font-weight-bold">โรงพยาบาลคีรีมาศ</h3>
          </div>
          <v-card class="elevation-12" :loading="isLoading">
            <v-toolbar dark color="primary">
              <v-toolbar-title>สมัครสมาชิก</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="form.name"
                  :counter="45"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-email"
                  v-model="form.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-account-circle"
                  v-model="form.username"
                  :rules="usernameRules"
                  :counter="45"
                  label="Username"
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
                  autocomplete="on"
                  required
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  v-model="form.password_confirmation"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, passwordMatch]"
                  :type="show2 ? 'text' : 'password'"
                  label="Confirm Password"
                  hint="At least 8 characters"
                  counter
                  autocomplete="on"
                  required
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="#006738"
                class="white--text"
                @click="doRegister"
              >
                <span class="font-weight-bold">
                  สมัครสมาชิก
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
  layout: 'AuthLayout',
  name: 'Register',
  components: {
    Logo,
  },
  data() {
    return {
      valid: true,
      show1: false,
      show2: false,
      isLoading: false,
      form: {
        name: 'ศุภราช วรรณทิพภากรณ์',
        email: 'admin@gmail.com',
        username: 'benz00',
        password: '123456789',
        password_confirmation: '123456789',
      },
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 45) || 'Name must be less than 45 characters',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
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
  computed: {
    passwordMatch() {
      return () =>
        this.form.password === this.form.password_confirmation ||
        'The password confirmation does not match'
    },
  },
  methods: {
    doRegister() {
      this.isLoading = 'red'
      axios
        .post('/api/register', this.form)
        .then((response) => {
          this.$refs.registerForm.reset()
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
  },
}
</script>
