<template lang="pug">
  Page(actionBarHidden="true" class="page")
    StackLayout
      TabView(tabBackgroundColor="#f6d624" tabTextColor="#786705" selectedTabTextColor ="white")
        TabViewItem(title="Credentials")
          StackLayout
            Textfield(v-model="form.email" hint="E-mail Address" width="300" secure=false keyboardType="email" autocorrect="false" autocapitalizationType="none")
            Textfield(v-model="form.password" hint="Password" width="300" secure=true autocorrect="false" autocapitalizationType="none")
            Textfield(hint="Confirm password" width="300" secure=true autocorrect="false" autocapitalizationType="none")
        TabViewItem(title="Company Details")
          StackLayout
            Textfield(v-model="form.name" hint="Company Name" width="300" secure=false keyboardType="email" autocorrect="false" autocapitalizationType="none")
            Textfield(v-model="form.address" style="margin-top: 15px" class="input input-border" hint="Address" width="300" borderColor="#DEDEDE" borderWidth="1" height="100" secure=false autocorrect="false" autocapitalizationType="none")

        TabViewItem(title="Background")
          Label(text="Content for Background")

        TabViewItem(title="Finish")
          StackLayout
            Button(text="Submit" horizontalAlignment="center" @tap="submit(form)")
</template>

<script lang="coffee">
  import firebase from "nativescript-plugin-firebase"
  import LogIn from './Login'
  export default
    data: ->
      form: {
        email: ''
        password: ''
        type: 'employer'
        name: ''
        address: ''
      }

    methods:
      submit: (form) ->
        dialogs = require "tns-core-modules/ui/dialogs"
        firebase.createUser({
          email: form.email
          password: form.password
        }).then (user) ->
          firebase.update('/users', {
            "#{user.uid}" : form
          })
          dialogs.alert {
            title: "Sign up successful!"
            message:"Congratulations, welcome aboard JobsDirect!"
            okButtonText: "OK"
            }
          @$navigateTo(LogIn)
        .catch (error) ->
          dialogs.alert {
            title: "Sign up failed"
            message:"Unforseen error occurred."
            okButtonText: "OK"
            }
</script>

<style>

</style>
