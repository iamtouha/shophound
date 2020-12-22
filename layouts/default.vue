<template>
  <v-app>
    <v-fade-transition>
      <div
        class="grey lighten-4 align-center justify-center"
        :class="[$store.getters.loading ? 'loading-screen' : 'd-none']"
      >
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-fade-transition>
    <v-app-bar extension-height="55px" :hide-on-scroll="!isMobile" fixed app>
      <v-app-bar-nav-icon
        v-show="isMobile"
        @click="bottomSheet = !bottomSheet"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        :class="[isMobile ? 'pl-0' : '']"
        @click="$router.push('/')"
      >
        <v-img max-width="175px" src="/banner-hound-blue.svg"></v-img>
      </v-toolbar-title>
      <v-spacer />
      <span v-show="!isMobile">
        <v-btn
          v-for="{ name, path } in routes"
          :key="name"
          text
          :to="path"
          nuxt
        >
          {{ name }}
        </v-btn>
      </span>

      <template v-if="!isMobile" v-slot:extension>
        <v-container class="py-0">
          <v-row class="py-0">
            <v-col cols="6" md="7" class="py-0">
              <v-text-field
                v-model="query"
                outlined
                class="mx-auto"
                hide-details
                label="Insert text"
                flat
                dense
              >
              </v-text-field
            ></v-col>
            <v-col cols="3" class="py-0">
              <v-select
                v-model="currency"
                :items="$store.getters.currencies"
                item-text="name"
                item-value="key"
                outlined
                hide-details
                dense
                label="Currency"
              ></v-select>
            </v-col>
            <v-col cols="3" md="2" class="py-0">
              <v-btn
                elevation="0"
                color="primary"
                style="width: 100%"
                @click="proceedSearch"
              >
                <v-icon class="mr-1">mdi-magnify</v-icon>
                Search</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-app-bar>
    <v-main class="pb-12">
      <nuxt />
      <v-btn
        v-show="isMobile"
        color="primary"
        fab
        bottom
        right
        fixed
        @click="searchDialog = !searchDialog"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-dialog v-model="searchDialog">
        <v-card>
          <v-card-title> Search </v-card-title>
          <v-card-text class="pb-0">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="query"
                  hide-details
                  label="Enter text"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="currency"
                  hide-details
                  outlined
                  :items="$store.getters.currencies"
                  label="Currency"
                  value="all"
                  item-value="key"
                  item-text="name"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              large
              color="primary"
              class="full-width"
              elevation="0"
              @click="proceedSearch"
            >
              <v-icon class="mr-1">mdi-magnify</v-icon>
              search
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar" timeout="2000">
        text field cannot be empty
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <v-bottom-sheet v-model="bottomSheet">
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
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      bottomSheet: false,
      searchDialog: false,
      snackbar: false,
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
    query: {
      get() {
        return this.$store.getters.search?.query
      },
      set(val) {
        this.$store.commit('set_query', val)
      },
    },
    currency: {
      get() {
        return this.$store.getters.search?.currency
      },
      set(val) {
        this.$store.commit('set_currency', val)
      },
    },
  },

  watch: {
    '$route.path'() {
      this.bottomSheet = false
    },
    '$route.query': {
      deep: true,
      immediate: true,
      handler(val) {
        const { q, currency } = val
        if (q) this.query = q
        if (currency) this.currency = currency
      },
    },
  },

  mounted() {
    this.$store.commit('loading_off')
  },
  methods: {
    proceedSearch() {
      this.searchDialog = false
      if (this.query.length) {
        this.$router.push({
          path: '/products',
          query: {
            q: this.query,
            currency: this.currency,
          },
        })
      } else this.snackbar = true
    },
  },
}
</script>
<style>
.loading-screen {
  display: flex;
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
