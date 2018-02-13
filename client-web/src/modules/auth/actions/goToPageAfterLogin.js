export default ({ router }) => {
  const path = document.location.pathname
  if (path === '/login') {
    router.goTo('/')
  } else {
    router.reload()
  }
}
