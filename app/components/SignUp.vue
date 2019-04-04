<template lang="pug">
  Page(actionBarHidden="true" class="page")
    StackLayout(horizontalAlignment="center" verticalAlignment="center" width="300")
      Label(text="What account are you signing up for?" horizontalAlignment="center")
      GridLayout(rows="*" columns="*,*" height="50")
        Button(row="0" col="0" text="Applicant" backgroundColor="#09cefd" color="#01647c" @tap="toSignUpApplicant()")
        Button(row="0" col="1" text="Employer" backgroundColor="#f6d624" color="#786705" @tap="toSignUpEmployer()")

</template>
<script lang="coffee">
  import SignUpApplicant from './SignUpApplicant'
  import SignUpEmployer from './SignUpEmployer'
  export default
    methods:
      toSignUpApplicant: ->
        @$navigateTo(SignUpApplicant)
      toSignUpEmployer: ->
        @$navigateTo(SignUpEmployer)
</script>
<style lang="scss">
</style>
