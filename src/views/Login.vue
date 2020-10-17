<template>
  <div>
    <form @submit.prevent>
      <div>
        <input
          v-model="loginForm.email"
          id="email"
          type="email"
          placeholder="jone@doe.com"
        />
      </div>
      <div>
        <input v-model="loginForm.password" id="password" type="password" />
      </div>
      <button type="submit" @click="login">Login</button>
      <div>
        Don't you have an account. Click <a href="/signup">here</a> to signup
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    loginForm: {
      email: "",
      password: "",
    },
  }),
  methods: {
    login() {
      this.$store.dispatch("login", this.loginForm);
    },
  },
};
</script>

<style></style>
