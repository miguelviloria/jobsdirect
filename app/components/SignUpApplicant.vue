<template lang="pug">
  Page(actionBarHidden="true" class="page")
    StackLayout
      TabView(tabBackgroundColor="#09cefd" tabTextColor="#01647c" selectedTabTextColor ="white")
        TabViewItem(title="Credentials")
          StackLayout(horizontalAlignment="center" verticalAlignment="center" )
            Textfield(v-model="form.email" hint="E-mail Address" width="300" secure=false keyboardType="email" autocorrect="false" autocapitalizationType="none")
            Textfield(v-model="form.password" hint="Password" width="300" secure=true autocorrect="false" autocapitalizationType="none")
            Textfield(hint="Confirm password" width="300" secure=true autocorrect="false" autocapitalizationType="none")
        TabViewItem(title="Personal Details")
          StackLayout
            Textfield(v-model="form.name" hint="Full Name" width="300" secure=false keyboardType="email" autocorrect="false" autocapitalizationType="none")
            Textfield(v-model="form.birthday" hint="Birthday" width="300" secure=false autocorrect="false" autocapitalizationType="none")
            Textfield(v-model="form.address" style="margin-top: 15px" class="input input-border" hint="Address" width="300" borderColor="#DEDEDE" borderWidth="1" height="100" secure=false autocorrect="false" autocapitalizationType="none")

        TabViewItem(title="Background")
          Label(text="Content for Background")

        TabViewItem(title="Finish")
          StackLayout
            Button(text="Submit" horizontalAlignment="center" @tap="submit(form)")
</template>

<script lang="coffee">
  import firebase from "nativescript-plugin-firebase"
  import HomeApplicant from './HomeApplicant'
  export default
      data: ->
        form: {
          email: ''
          password: ''
          type: 'applicant'
          name: ''
          birthday: ''
          address: ''
        }

      methods:
        submit: (form) ->
          dialogs = require "tns-core-modules/ui/dialogs"
          signUp = false
          try
            firebase.createUser({
              email: form.email
              password: form.password
            }).then (user) ->
              firebase.update('/users', {
                "#{user.uid}" : form
              })
              signUp = true
            .catch (error) ->
              dialogs.alert {
                title: "Sign up failed"
                message:"Unforseen error occurred."
                okButtonText: "OK"
                }
            if signUp
              firebase.login(
                {
                  type: firebase.LoginType.PASSWORD,
                  passwordOptions: {
                    email: form.email,
                    password: form.password
                  }
                })
                .then (result) ->
                  @$navigateTo(HomeApplicant, {props: {details: result}})
          catch e
            console.log e


</script>

<style>
</style>
