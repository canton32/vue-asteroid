<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <h3>NeoWs</h3>
        </router-link>
        <div>
          <router-link to="/">Home</router-link>

          <a @click="logout()">logout</a>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
