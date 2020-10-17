<template>
  <div>
    <form @submit.prevent>
      <div>
        <label for="name">Name</label>
        <input
          v-model.trim="signupForm.name"
          type="text"
          placeholder="Jone Doe"
          id="name"
        />
      </div>
      <div>
        <label for="email">Email</label>
        <input
          v-model.trim="signupForm.email"
          type="text"
          placeholder="jone.doe@email.com"
          id="email"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          v-model.trim="signupForm.password"
          type="password"
          placeholder="min 6 characters"
          id="password"
        />
      </div>
      <div>
        <label for="confirm_password">Confirm</label>
        <input
          v-model.trim="signupForm.confirm_password"
          type="password"
          placeholder="min 6 characters"
          id="confirm_password"
        />
      </div>
      <button @click="signup()" class="button">Sign Up</button>
    </form>

    <div>Already have an account? Click <a href="/login">here</a> to login</div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data: () => ({
    signupForm: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  }),
  methods: {
    signup() {
      this.$store.dispatch("signup", this.signupForm);
    },
  },
};
</script>

<style></style>
