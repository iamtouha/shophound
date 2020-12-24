<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="6" sm="4" md="3" lg="2">
        <logo width="100%" height="100%" />
      </v-col>
      <v-col cols="12">
        <v-row style="max-width: 800px" class="mx-auto" justify="center">
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="query"
              hide-details
              label="Enter text"
              outlined
              @keyup.enter="$refs.searchBtn.click"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
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
          <v-btn ref="searchBtn" x-large color="primary" @click="proceedSearch">
            <v-icon class="mr-1">mdi-magnify</v-icon>
            search
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" timeout="2000">
      text field cannot be empty
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'homepage',
  data() {
    return {
      snackbar: false,
    }
  },
  computed: {
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
  methods: {
    proceedSearch() {
      if (this.query.length) {
        this.$router.push({
          path: '/products',
          query: {
            q: this.query,
            currency: this.currency,
            page: 1,
          },
        })
      } else this.snackbar = true
    },
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
