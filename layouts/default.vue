<template>
  <v-app>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon
        v-show="isMobile"
        @click="extended = !extended"
      ></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/')">
        <v-img max-width="200px" src="/banner-hound-blue.svg"></v-img>
      </v-toolbar-title>
      <v-toolbar-items v-show="!isMobile">
        <v-btn
          v-for="{ name, path } in routes"
          :key="name"
          elevation="0"
          :to="path"
          nuxt
        >
          {{ name }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-bottom-sheet v-model="extended">
      <v-list>
        <v-list-item
          v-for="{ name, path } in routes"
          :key="name"
          :to="path"
          nuxt
        >
          {{ name }}
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      extended: false,
      routes: [
        {
          name: 'Home',
          path: '/',
        },
        {
          name: 'About',
          path: '/about',
        },
        {
          name: 'Contact us',
          path: '/contact',
        },
      ],
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly
    },
  },
  watch: {
    '$route.path'() {
      this.extended = false
    },
  },
}
</script>
