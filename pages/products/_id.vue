<template>
  <v-container>
    <client-only>
      <v-carousel
        style="max-width: 800px"
        class="mx-auto"
        height="400px"
        hide-delimiters
        :show-arrows="product.images.length > 1"
      >
        <v-carousel-item v-for="img in product.images" :key="img">
          <v-img contain height="100%" :src="img" :lazy-src="img"></v-img>
        </v-carousel-item>
      </v-carousel>
    </client-only>
    <v-list-item class="px-0">
      <v-list-item-content>
        <v-list-item-title style="whitespace: wrap" class="text-h5 text-wrap">
          {{ product.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-subtitle-1">
          {{ parseFloat(product.maxPrice).toFixed(3) }} {{ product.currency }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action v-show="!isMobile">
        <v-btn large color="primary" target="_blank" :href="product.itemUrl">
          Check it out!
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-btn
      v-show="isMobile"
      large
      color="primary"
      target="_blank"
      :href="product.itemUrl"
      >Check it out!
    </v-btn>
    <client-only>
      <!-- eslint-disable-next-line -->
      <p class="mt-6" v-html="product.description"></p>
    </client-only>
  </v-container>
</template>

<script>
export default {
  name: 'Product',
  async asyncData({ $axios, params }) {
    const id = params.id.split('%\\%').join('/')
    const { data } = await $axios.get('/item/' + id)
    return {
      product: data,
    }
  },

  data() {
    return {
      product: {
        images: [],
      },
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly
    },
  },
  created() {
    // this.fetchProduct()
  },
  methods: {
    async fetchProduct() {
      try {
        const id = this.$route.params.id.split('%\\%').join('/')
        const { data } = await this.$axios.get('/item/' + id)
        this.product = data
      } catch (error) {
        alert(error.message)
      }
    },
  },
  head() {
    return {
      title: this.product.title,
    }
  },
}
</script>
