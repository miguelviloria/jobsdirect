<template lang="pug">
  Page(class="page")
    ActionBar(:title="welcome" backgroundColor="#09cefd" color="white")
      template(v-if = "!isOpen")
        ActionItem(@tap="openDrawer()" android.systemIcon="arrow_down_float" android.position="actionBar")
      template(v-else)
        ActionItem(@tap="onCloseDrawerTap" android.systemIcon="arrow_up_float" android.position="actionBar")
    RadSideDrawer(ref="drawer")
      StackLayout(~drawerContent class="sideStackLayout" backgroundColor="white" padding="5")
        Image(src="res://default_profile" height="150" fill="aspectFill")
        StackLayout(height="300")
          GridLayout(rows="*,*,*,*" columns="*,*" padding="5")
            Label(text="Full Name" row="0" col="0")
            Label(:text="fullName" row="0" col="1")

            Label(text="E-Mail" row="1" col="0")
            Label(:text="details.email" row="1" col="1")

            Label(text="Address" row="2" col="0")
            Label(:text="details.address" row="2" col="1")

        GridLayout(rows="*" columns="*,*" padding="5" height="50")
          Button(row="0" col="0" text="Edit" backgroundColor="#09cefd" color="#01647c")
          Button(row="0" col="1" text="Log Out" backgroundColor="#f6d624" color="#786705")

      StackLayout(~mainContent)
        Label(textWrap="true" text="CONTENT")


</template>

<script lang="coffee">
  export default
    props: ["details"]
    created: ->
      @mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
    data: ->
      mainContentText: ""
      isOpen: false
      welcome: "Welcome, #{@details.firstName}!"
      fullName: "#{@details.firstName} #{(@details.middleName).charAt(0)} #{@details.lastName}"
    methods:
      openDrawer: ->
        @isOpen = true
        @$refs.drawer.nativeView.showDrawer()
      onCloseDrawerTap: ->
        @isOpen = false
        @$refs.drawer.nativeView.closeDrawer()
</script>

<style lang="scss">

</style>
