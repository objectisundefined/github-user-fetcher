<template>
   <form @submit.prevent="handleSubmit">
    <input
      class="input"
      :value="inputValue"
      @input="updateValue($event.target.value)"
      type="text"
      placeholder="Enter a github username..."
    >
    <button class="button">Go!</button>
  </form>
</template>

<script>
export default {
  name: 'user-form',
  props: [
    'inputValue'
  ],
  methods: {
    updateValue (val) {
      this.$emit('input', val)
    },
    handleSubmit () {
      this.$emit('go')
    }
  }
}
</script>

<style lang="stylus" scoped>
input
  width 320px

input
  border none
  outline none
  box-shadow 0 4px 4px 0 rgba(0,0,0,.12),0 0 4px 0 rgba(0,0,0,.08)
  height 25px
  line-height 25px
  padding 7.5px 15px
  color #4a4a4a
  font-size 14px
  background-color #fff
  border-radius 2px
  margin 15px
  -webkit-transition all .4s
  transition all .4s
  width 80%
  max-width 400px
  min-width 200px

button
  line-height 25px
  padding 7.5px 15px
  color #4a4a4a
  font-size 14px
  border-radius 2px
  border none
  margin 15px

form
  display flex
  justify-content center
</style>
