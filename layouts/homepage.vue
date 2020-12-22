<template>
  <v-app>
    <v-fade-transition>
      <div
        class="grey lighten-4 align-center justify-center"
        :class="[$store.getters.loading ? 'loading-screen' : 'd-none']"
      >
        <div class="my-3" style="width: 100px; height: 100px">
          <logo />
        </div>
        <v-progress-linear
          style="max-width: 175px"
          color="primary"
          indeterminate
        ></v-progress-linear>
      </div>
    </v-fade-transition>

    <v-main>
      <nuxt />
    </v-main>
    <v-footer app>
      <v-btn class="text-none" text nuxt to="/about"> About </v-btn>
      <v-btn class="text-none" text nuxt to="/contact"> Contact us </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'HomePageLayout',

  watch: {
    '$route.path'() {
      this.extended = false
    },
  },

  mounted() {
    setTimeout(() => {
      this.$store.commit('loading_off')
    }, 500)
  },
}
</script>
<style>
.loading-screen {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
