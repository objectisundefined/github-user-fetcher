<template>
  <div class="fetch">
    <user-form
      v-model="inputValue"
      :input-value="inputValue"
      @go="submit"
    ></user-form>
    <stats
      :username="username"
      :avatar="avatar"
      :fave-lang="faveLang"
      :followers="followers"
    ></stats>
  </div>
</template>

<script>
import api from '../../api'
import UserForm from './user-form'
import Stats from './stats'

export default {
  name: 'fetch',
  components: {
    UserForm,
    Stats
  },
  data () {
    return {
      inputValue: '',
      username: '',
      avatar: '',
      followers: [],
      faveLang: '',
      errorMsg: ''
    }
  },
  methods: {
    submit () {
      if (this.inputValue) {
        this.fetchUser(this.inputValue)
      }
    },
    fetchUser (val) {
      api.fetchUser(val)
      .then(res => {
        const { data } = res

        this.inputValue = ''
        this.username = data.login
        this.avatar = data.avatar_url

        api.fetchFollowers(this.username).then(followers => {
          this.followers = followers
        })

        api.fetchLanguages(this.username).then(languages => {
          var map = languages.reduce((prev, next) => {
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
      })
      .catch(err => {
        console.warn('ERROR:', err)
      })
    }
  }
}
</script>

<style lang="stylus">
body
  background-color #fff
</style>
