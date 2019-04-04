<template lang="pug">
  Page(class="page")
    ActionBar(:title="welcome" backgroundColor="#09cefd" color="white")
    StackLayout
      Label(text="Content for Applicant")

</template>

<script lang="coffee">
  export default
    props: ["details"]
    data: ->
      welcome: "Welcome, #{@details.firstName}!"
</script>

<style lang="scss">

</style>
