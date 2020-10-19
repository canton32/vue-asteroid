<template>
  <div class="main-content background">
    <b-container>
      <div class="header-body text-center pt-5">
        <b-row class="justify-content-center">
          <b-col xl="5" lg="6" md="8" class="px-5">
            <h1 class="text-white">Create account</h1>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
      <div>
        <b-container class="pb-5">
          <!-- Table -->
          <b-row class="justify-content-center">
            <b-col lg="6" md="8">
              <b-card no-body class="bg-secondary border-0">
                <b-card-header class="bg-transparent pb-5">
                  <div class="text-muted text-center mt-2 mb-4">
                    <small>Sign up with</small>
                  </div>
                  <div class="text-center">
                    <a href="#" class="btn btn-neutral btn-icon mr-4">
                      <span class="btn-inner--icon"
                        ><img src="img/icons/common/github.svg"
                      /></span>
                      <span class="btn-inner--text">Github</span>
                    </a>
                    <a href="#" class="btn btn-neutral btn-icon">
                      <span class="btn-inner--icon"
                        ><img src="img/icons/common/google.svg"
                      /></span>
                      <span class="btn-inner--text">Google</span>
                    </a>
                  </div>
                </b-card-header>
                <b-card-body class="px-lg-5 py-lg-5">
                  <div class="text-center text-muted mb-4">
                    <small>Or sign up with credentials</small>
                  </div>
                  <validation-observer
                    v-slot="{ handleSubmit }"
                    ref="formValidator"
                  >
                    <b-form role="form" @submit.prevent="handleSubmit(signup)">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon="ni ni-hat-3"
                        placeholder="Name"
                        name="Name"
                        :rules="{ required: true }"
                        v-model="form.name"
                      >
                      </base-input>

                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon="ni ni-email-83"
                        placeholder="Email"
                        name="Email"
                        :rules="{ required: true, email: true }"
                        v-model="form.email"
                      >
                      </base-input>

                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon="ni ni-lock-circle-open"
                        placeholder="password"
                        type="password"
                        name="Password"
                        :rules="{ required: true, min: 6 }"
                        v-model="form.password"
                      >
                      </base-input>
                      <div class="text-muted font-italic">
                        <small
                          >password strength:
                          <span class="text-success font-weight-700"
                            >strong</span
                          ></small
                        >
                      </div>
                      <div class="text-center">
                        <b-button type="submit" variant="primary" class="mt-4"
                          >Create account</b-button
                        >
                      </div>
                    </b-form>
                  </validation-observer>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </zoom-center-transition>
  </div>
</template>

<script>
import { ZoomCenterTransition } from 'vue2-transitions'
import { BaseInput } from '../components'

export default {
  components: {
    ZoomCenterTransition,
    BaseInput,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },

      pageTransitionDuration: 200,
    }
  },
  methods: {
    signup() {
      this.$store.dispatch('auth/signup', this.form)
    },
  },
}
</script>

<style scoped>
.background {
  background-image: url('https://wallpaperaccess.com/full/1325724.jpg');
  width: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}
</style>
