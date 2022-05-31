<template>
  <v-app id="inspire" style="background-color: #fff;">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div class="d-flex justify-center mb-2">
            <Logo maxWidth="30%" maxHeight="30%" />
          </div>
          <div class="d-flex justify-center mb-1">
            <h2 class="font-weight-bold">ระบบแผนเงินบำรุง ระดับโรงพยาบาล</h2>
          </div>
          <div class="d-flex justify-center mb-2">
            <h3 class="font-weight-bold">โรงพยาบาลคีรีมาศ</h3>
          </div>
          <v-card class="elevation-12" :loading="true">
            <v-toolbar dark color="primary">
              <v-toolbar-title>สมัครสมาชิก</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="registerForm" lazy-validation>
                <v-alert
                  v-for="(val, index) in errors"
                  :key="index"
                  shaped
                  text
                  :value="userExists"
                  color="error"
                  icon="mdi-alert"
                >
                  {{ val }}
                </v-alert>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="form.name"
                  :counter="45"
                  :rules="[rules.required, rules.less]"
                  label="Name"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-email"
                  v-model="form.email"
                  :rules="[rules.required, rules.email]"
                  :error-message="errors.email"
                  label="E-mail"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-account-circle"
                  v-model="form.username"
                  :rules="[rules.required]"
                  :counter="45"
                  label="Username"
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
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  v-model="form.password_confirmation"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  label="Confirm Password"
                  hint="At least 8 characters"
                  counter
                  :error="!valid()"
                  autocomplete="on"
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                block
                color="#006738"
                class="white--text"
                @click="register"
              >
                <span class="font-weight-bold">สมัครสมาชิก</span>
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
      show1: false,
      show2: false,
      isLoading: true,
      userExists: false,
      // form: {
      //   name: "",
      //   email: "",
      //   username: "",
      //   password: "",
      //   password_confirmation: "",
      // },
      errors: {},
      form: {
        name: 'ศุภราช วรรณทิพภากรณ์',
        email: 'admin@gmail.com',
        username: 'benz00',
        password: '123456789',
        password_confirmation: '123456789',
      },
      rules: {
        required: (v) => !!v || 'กรุณากรอกข้อมูล',
        min: (v) => !!v || 'จำนวนอักขระไม่น้อยกว่า 8 ตัว',
        less: (v) => (v && v.length <= 45) || 'จำนวนอักขระไม่เกิน 45 ตัวอักษร',
        email: (v) => {
          const pattern = /.+@.+\..+/
          return pattern.test(v) || 'อีเมลต้องถูกต้อง'
        },
      },
    }
  },
  methods: {
    register() {
      console.log('register')
      this.isLoading = true
      this.$store
        .dispatch('REGISTER', {
          name: this.form.name,
          email: this.form.email,
          username: this.form.username,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
        })
        .then(({ status }) => {
          // this.$store.commit("SET_NOTIFICATION", {
          //   display: true,
          //   text: "Your account has been successfully created! you can now login.",
          //   alertClass: "danger",
          // });
          this.$refs.registerForm.reset()
          this.$router.push('/login')
        })
        .catch((error) => {
          this.userExists = true
          this.errors = error.response.data.errors
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    valid() {
      return this.form.password === this.form.password_confirmation
    },
  },
}
</script>
