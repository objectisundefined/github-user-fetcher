<template>
  <div class="fetch">
    <form @submit.prevent="submit">
      <input v-model="inputValue" placeholder="Enter a github username...">
      <button>Go!</button>
    </form>
    <h1 v-text="username"></h1>
    <img v-if="avatar" :src="avatar" class="avatar">
    <h2 v-if="faveLang">😍 Favourite Language: {{ faveLang }}</h2>
    <h3 v-if="followers.length > 0">Followers ({{ followers.length }}):</h3>
    <ul v-if="followers.length > 0">
      <li v-for="follower in followers">
        {{ follower }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      inputValue: '',
      username: '',
      avatar: '',
      followers: [],
      faveLang: '',
      errorMsg: '',
      urlBase: 'https://api.github.com/users'
    }
  },
  methods: {
    submit () {
      const api = `${this.urlBase}/${this.inputValue}`

      this.fetchUser(api)
    },
    fetchUser (api) {
      axios.get(api)
      .then(res => {
        const { data } = res

        this.inputValue = ''
        this.username = data.login
        this.avatar = data.avatar_url

        this.fetchFollowers()
        this.fetchFaveLang()
      })
      .catch(err => {
        console.warn('ERROR:', err)
      })
    },
    fetchFollowers () {
      axios.get(`${this.urlBase}/${this.username}/followers`)
      .then(res => {
        this.followers = res.data.map(follower => follower.login)
      })
    },
    fetchFaveLang () {
      axios.get(`${this.urlBase}/${this.username}/repos`)
      .then(res => {
        const langs = res.data.map(repo => repo.language)

        var map = langs.reduce((prev, next) => {
          if (!prev[next]) {
            prev[next] = 0
          }

          prev[next] += 1

          return prev
        }, {})

        var faveLang = Object.keys(map).reduce((prev, next) => {
          return map[prev] > map[next] ? prev : next
        })

        this.faveLang = faveLang
      })
    }
  }
}
</script>

<style lang="stylus">
body
  background-color goldenrod

.fetch
  dispaly flex
  align-items center
  flex-flow column
  font-family Comic Sans MS

  input
    width 320px

  input,
  button
    font-size 25px

  h1
    font-size 44px

  .avatar
    height 200px
    width 200px
    border-radius 10%
</style>
