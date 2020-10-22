<template>
  <card>
    <b-row align-v="center" slot="header">
      <b-col cols="8">
        <h3 class="mb-0">Your profile</h3>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">User information</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              type="text"
              label="Username"
              placeholder="Username"
              v-model="user.name"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="email"
              label="Email address"
              placeholder="mike@email.com"
              v-model="user.email"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </card>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component
export default class EditProfileForm extends Vue {
  @State(state => state.auth.user) user
}
</script>
<style></style>
