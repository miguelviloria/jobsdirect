<template lang='pug'>
  Page(actionBarHidden="true" class="page")
    StackLayout(v-loading="loggingIn" :loading-options="{ text: 'Please wait...' }" horizontalAlignment="center" verticalAlignment="middle" width="300")
      Image(src="res://logo" height="250" fill="aspectFill")
      Textfield(v-model="email" class="input" hint="E-mail Address" keyboardType="email" autocorrect="false" autocapitalizationType="none")
      Textfield(v-model="password" class="input" hint="Password" secure=true autocorrect="false" autocapitalizationType="none")

      GridLayout(rows="*" columns="*,*" height="50")
        Button(row="0" col="0" text="Log In" backgroundColor="#09cefd" color="#01647c" @tap="logIn(email, password)")
        Button(row="0" col="1" text="Sign Up" backgroundColor="#f6d624" color="#786705" @tap="signUp()")

      Label(text="Forgot your password?" horizontalAlignment="center")



</template>

<script lang='coffee'>
  import firebase from "nativescript-plugin-firebase"
  import SignUp from './SignUp'
  import HomeApplicant from './HomeApplicant'
  import HomeEmployer from './HomeEmployer'
  import * as enums from 'ui/enums'
  export default
    data: ->
      title: 'JobsDirect'
      loggingIn: false
      email: 'grim.shadow.2@gmail.com'
      password: 'test01'

    methods:
      # startUp: ->
      #   this.$refs.startUi.nativeView
      #     .animate({
      #       translate: { x: 0, y: -90 },
      #       duration: 500,
      #       curve: enums.AnimationCurve.easeIn })

      signUp: ->
        @$navigateTo(SignUp)

      logIn: (email, password) ->
        @loggingIn = true
        dialogs = require "tns-core-modules/ui/dialogs"
        context = @
        try
          firebase.login(
            {
              type: firebase.LoginType.PASSWORD,
              passwordOptions: {
                email: email,
                password: password
              }
            })
            .then (result) ->
              console.log JSON.stringify result
              firebase.getValue('/users/' + result.uid)
                .then (data) ->
                  switch data.value.type
                    when 'applicant'
                      context.$navigateTo(HomeApplicant, {props: {details: data.value} })
                    when 'employer'
                      context.$navigateTo(HomeEmployer,  {props: {details: data.value} })
            .catch (error) ->
              dialogs.alert {
                title: "Log In failed"
                message:"The password is invalid or the user does not exist."
                okButtonText: "OK"
                }
        catch e
          console.error e
        finally
          @loggingIn = false

</script>

<style lang="scss">
    // Custom common variables
  @import '../app-variables';
  .synopsis {
    text-overflow: ellipsis;
  }
  .list-group {
    .list-group-item-content {
        padding: 8 15 4 15;
        background-color: $background-light;
    }
    .list-group-item-text {
        margin: 2 3;
    }
    .fa {
        color: $accent-dark;
    }
  }
</style>
