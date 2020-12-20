<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="6" sm="4" md="3" lg="2">
        <v-img src="/hound-blue.svg"></v-img>
      </v-col>
      <v-col cols="12">
        <v-row style="max-width: 800px" class="mx-auto" justify="center">
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="search.query"
              hide-details
              label="Enter text"
              outlined
              @keyup.enter="$refs.searchBtn.click"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-select
              v-model="search.currency"
              hide-details
              outlined
              :items="currencies"
              label="Currency"
              value="all"
              item-value="key"
              item-text="name"
            ></v-select>
          </v-col>
          <v-btn ref="searchBtn" x-large color="primary" @click="proceedSearch">
            <v-icon class="mr-1">mdi-magnify</v-icon>
            search</v-btn
          >
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
  components: {},

  data() {
    return {
      snackbar: false,
      search: {
        query: '',
        currency: 'all',
      },
      currencies: [
        {
          name: 'All',
          key: 'all',
        },
        {
          name: 'USD',
          key: 'usd',
        },
        {
          name: 'GBP',
          key: 'gbp',
        },
      ],
    }
  },
  methods: {
    proceedSearch() {
      if (this.search.query.length) {
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
