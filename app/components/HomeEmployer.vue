<template lang="pug">
  Page(class="page")
    ActionBar(:title="welcome" backgroundColor="#09cefd" color="white")
    StackLayout
      Label(text="Content for Employer")

</template>

<script lang="coffee">
  export default
    data: ->
      welcome: "Welcome, !"
</script>

<style lang="scss">

</style>
