export default {
  state: () => ({
    loading: true,
    search: {
      query: '',
      currency: '',
    },
    currencies: [
      { name: 'All', key: '' },
      { name: 'USD', key: 'USD' },
      { name: 'CAD', key: 'CAD' },
      { name: 'GBP', key: 'GBP' },
      { name: 'AUD', key: 'AUD' },
      { name: 'NZD', key: 'NZD' },
    ],
  }),
  getters: {
    loading: ({ loading }) => loading,
    search: ({ search }) => search,
    currencies: ({ currencies }) => currencies,
  },
  mutations: {
    loading_off(state) {
      state.loading = false
    },
    set_query(state, payload) {
      state.search.query = payload
    },
    set_currency(state, payload) {
      state.search.currency = payload
    },
  },
}
