<template>
  <v-container class="fill-height">
    <v-row class="py-5">
      <v-col cols="12" sm="9" md="10">
        <v-select
          v-model="selectedTags"
          label="Select Categories"
          :items="tags"
          item-value="id"
          item-text="name"
          chips
          dense
          deletable-chips
          hide-details
          multiple
        >
          <template v-slot:item="{ item }">
            {{ item.name }} ({{ item.count }})
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="3" md="2" class="text-center">
        <v-btn color="primary" outlined large text @click="filterCategories">
          <v-icon>mdi-filter</v-icon>
          Filter
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      :align="!hits.length ? 'center' : 'stretch'"
      :style="{
        height: !skeletons && !hits.length ? 'calc(100% - 110px)' : 'auto',
      }"
    >
      <v-col v-for="n in skeletons" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader height="340" type="card"></v-skeleton-loader>
      </v-col>
      <v-col v-show="!skeletons && !hits.length" class="text-center">
        <v-icon size="64">mdi-magnify</v-icon>
        <br />
        no item found
      </v-col>
      <v-col
        v-for="product in hits"
        :key="product.id"
        class="d-flex"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          nuxt
          :to="{
            name: 'products-id',
            params: { id: product.id },
          }"
          class="flex-grow-1"
        >
          <v-img
            height="300px"
            class="align-end"
            position="top"
            :src="product.images[0]"
            :lazy-src="product.images[0]"
            contain
          >
            <v-chip color="primary" class="ma-2">
              {{ parseFloat(product.maxPrice).toFixed(2) }}
              {{ product.currency }}
            </v-chip>
          </v-img>
          <v-card-title class="text-subtitle-1">
            {{ product.title }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-container v-show="Boolean(pages)" class="max-width">
      <v-pagination
        v-model="page"
        :total-visible="8"
        class="my-4"
        :length="pages"
      ></v-pagination>
    </v-container>
  </v-container>
</template>

<script>
import categories from '~/assets/categories.json'
const perPage = 36
export default {
  name: 'Products',
  async asyncData({ $axios, query }) {
    const params = {
      tags: query.tags,
      q: query.q,
      from: (query.page - 1) * perPage,
      size: perPage,
      currency: query.currency || '',
    }
    const queryString = Object.keys(params)
      .filter((key) => params[key] !== undefined)
      .map((key) => `${key}=${params[key]}`)
      .join('&')
    // eslint-disable-next-line
    console.log(queryString)

    const { data } = await $axios.get('/item/?' + queryString)
    const { hits, totalHits, tags } = data
    return {
      hits,
      totalHits,
      tags: tags.map((tag) => ({
        name: categories[tag.id],
        id: tag.id,
        count: tag.count,
      })),
      params,
      page: +query.page,
      loading: false,
    }
  },
  data() {
    return {
      hits: [],
      loading: false,
      totalHits: 0,
      tags: [],
      page: 1,
      params: {
        size: perPage,
      },
      selectedTags: [],
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.totalHits / this.params.size || 0)
    },
    skeletons() {
      if (!this.loading) return 0
      const breakpoint = this.$vuetify.breakpoint.name
      switch (breakpoint) {
        case 'md':
          return 3
        case 'sm':
          return 2
        case 'xs':
          return 1
        default:
          return 4
      }
    },
  },

  watch: {
    page: 'paginate',
    'params.tags': {
      immediate: true,
      handler(val) {
        if (!val?.length) return
        const tags = val.split(',')
        this.selectedTags = this.tags
          .filter((tag) => tags.includes(tag.id))
          .map((tag) => tag.id)
      },
    },
    '$route.query': {
      deep: true,
      handler({ tags, q, currency, page }) {
        this.params = {
          ...this.params,
          tags,
          q,
          currency: currency || '',
        }
        this.page = +page
        this.fetchItems()
      },
    },
  },
  created() {
    // const { tags, page, q, currency } = this.$route.query
    // this.page = +page
    // this.params = {
    //   tags,
    //   q,
    //   from: (page - 1) * perPage,
    //   size: perPage,
    //   currency: currency || '',
    // }
    // this.fetchItems()
  },
  methods: {
    filterCategories() {
      const tags = this.selectedTags.join(',')
      this.$router.push({
        path: '/products',
        query: {
          q: this.params?.q,
          tags,
          currency: this.params?.currency,
          page: 1,
        },
      })
    },
    paginate(page) {
      if (page === +this.$route.query?.page) return
      this.$router.push({
        path: '/products',
        query: {
          q: this.params?.q,
          tags: this.params?.tags,
          currency: this.params?.currency,
          page,
        },
      })
    },
    async fetchItems() {
      this.loading = true
      try {
        this.hits = []
        const params = {
          ...this.params,
          from: this.params.size * (this.page - 1),
        }
        const queryString = Object.keys(params)
          .filter((key) => params[key] !== undefined)
          .map((key) => `${key}=${params[key]}`)
          .join('&')
        // eslint-disable-next-line
        console.log(queryString)
        const { data } = await this.$axios.get('/item/?' + queryString)
        const { hits, totalHits, tags } = data
        this.hits = hits
        this.totalHits = totalHits
        this.tags = tags.map((tag) => ({
          name: categories[tag.id],
          id: tag.id,
          count: tag.count,
        }))
      } catch (error) {
        alert(error.message)
      }
      this.loading = false
    },
  },
  head() {
    return {
      title: 'Products',
    }
  },
}
</script>
