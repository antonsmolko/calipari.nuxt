export default (axios, method, commit, { url, payload = null, thenContent = null, config = null }) => {
  return axios[method](url, payload, config)
    .then((response) => {
      if (thenContent) {
        return thenContent(response)
      }
      // commit('CLEAR_ERRORS', null, { root: true })
    })
    .catch((error) => {
      throw error
    })
}
