export default {
  store: () => ({
    search: '',
  }),
  getters: {
    search: ({ search }) => search,
  },
}
