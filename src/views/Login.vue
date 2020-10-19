<template>
  <div class="main-content background">
    <b-container>
      <div class="header-body text-center pt-5">
        <b-row class="justify-content-center">
          <b-col xl="5" lg="6" md="8" class="px-5">
            <h1 class="text-white">
              Welcome!
            </h1>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
      <div>
        <b-container>
          <b-row class="justify-content-center">
            <b-col lg="5" md="7">
              <b-card no-body class="bg-secondary border-0 mb-0">
                <b-card-header class="bg-transparent pb-5">
                  <div class="text-muted text-center mt-2 mb-3">
                    <small>Sign in with</small>
                  </div>
                  <div class="btn-wrapper text-center">
                    <a href="#" class="btn btn-neutral btn-icon">
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
                    <small>Or sign in with credentials</small>
                  </div>
                  <validation-observer
                    v-slot="{ handleSubmit }"
                    ref="formValidator"
                  >
                    <b-form role="form" @submit.prevent="handleSubmit(login)">
                      <base-input
                        v-model="form.email"
                        alternative
                        class="mb-3"
                        name="Email"
                        :rules="{ required: true, email: true }"
                        prepend-icon="ni ni-email-83"
                        placeholder="Email"
                      />

                      <base-input
                        v-model="form.password"
                        alternative
                        class="mb-3"
                        name="Password"
                        :rules="{ required: true, min: 6 }"
                        prepend-icon="ni ni-lock-circle-open"
                        type="password"
                        placeholder="Password"
                      />

                      <b-overlay
                        :show="busy"
                        rounded
                        opacity="0.6"
                        spinner-small
                        spinner-variant="primary"
                        class="d-inline-block"
                        @hidden="onHidden"
                      >
                        <div class="text-center">
                          <base-button
                            type="primary"
                            native-type="submit"
                            class="my-4"
                          >
                            Sign in
                          </base-button>
                        </div>
                      </b-overlay>
                    </b-form>
                  </validation-observer>
                </b-card-body>
              </b-card>
              <div class="text-right mb-5">
                <router-link to="/signup" class="text-light">
                  <small>Create new account</small>
                </router-link>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </zoom-center-transition>
  </div>
</template>
<script>
import { ZoomCenterTransition } from 'vue2-transitions'
import { BaseInput, BaseButton } from '../components'
export default {
  components: { ZoomCenterTransition, BaseInput, BaseButton },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },

      pageTransitionDuration: 1200,
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', this.form).then(() => {
        this.$router.push('/')
      })
    },
    onHidden() {
      // Return focus to the button
      this.$refs.button.focus()
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
