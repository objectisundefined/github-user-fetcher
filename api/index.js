import axios from 'axios'

export var urlBase = 'https://api.github.com/users'

export default {
  fetchUser (user) {
    return axios.get(`${urlBase}/${user}`)
  },
  fetchFollowers (user) {
    return (
      axios.get(`${urlBase}/${user}/followers`)
      .then(res => res.data.map(follower => follower.login))
    )
  },
  fetchLanguages (user) {
    return (
      axios.get(`${urlBase}/${user}/repos`)
      .then(res => res.data.map(repo => repo.language))
    )
  }
}
