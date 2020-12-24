/* eslint-disable */
if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })
    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
export default function (to, from, savedPosition) {
  let position
  if (to.name === from.name) return { x: 0, y: 0 }
  // Your Code Starts Here
  position = savedPosition || { x: 0, y: 0 }
  // Your Code Ends Here
  const nuxt = window.<%= globals.nuxt %>;
  // triggerScroll is only fired when a new component is loaded
  if (to.path === from.path) {
    nuxt.$nextTick(() => nuxt.$emit('triggerScroll'))
  }
  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      resolve(position)
    })
  })
}
