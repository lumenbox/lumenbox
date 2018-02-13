import * as Cookies from 'js-cookie'

export default cookieName => {
  function deleteCookie() {
    Cookies.remove(cookieName)
  }

  deleteCookie['displayName'] = `operator.deleteCookie(${String(cookieName)})`

  return deleteCookie
}
