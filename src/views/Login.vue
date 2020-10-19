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
              <b-overlay :show="loading" rounded="sm">
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
                    <div v-if="error" class="text-center text-danger">
                      <small>{{ error.message }}</small>
                    </div>
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

                        <div class="text-center">
                          <b-button
                            class="my-4"
                            ref="button"
                            :disabled="loading"
                            variant="primary"
                            type="submit"
                            >Sign in
                          </b-button>
                        </div>
                      </b-form>
                    </validation-observer>
                  </b-card-body>
                </b-card>
              </b-overlay>
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
import Vue from 'vue'
import Component from 'vue-class-component'
import { ZoomCenterTransition } from 'vue2-transitions'
import { BaseInput, BaseButton } from '../components'
import { State } from 'vuex-class'

@Component({
  name: 'Login',
  components: { ZoomCenterTransition, BaseInput, BaseButton },
})
class Login extends Vue {
  @State((state) => state.auth.loading) loading
  @State((state) => state.auth.error) error

  form = {
    email: '',
    password: '',
  }

  pageTransitionDuration = 1200

  login() {
    this.$store.dispatch('auth/login', this.form).then((result) => {
      if (result) {
        this.$router.push('/')
      }
    })
  }

  onHidden() {
    // Return focus to the button
    this.$refs.button.focus()
  }
}

export default Login
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
