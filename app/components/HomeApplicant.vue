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
        StackLayout(justifyContent="center" height="100%")
          StackLayout(height="90%")
            //- create card component
            //- loop it, add details taken from firebase using props.
            //- absolute layout.
            //- swipe left, remove from array. right, chat.
            AbsoluteLayout(height="100%" v-for="job in jobs" ref="topCard" class="top-card")
              StackLayout(horizontalAlignment="center" backgroundColor="white" height="90%" width="90%"
              left="20" top="20" borderRadius="30" borderColor="gray" borderWidth="1" padding="10")
                GridLayout(rows="*,*,*" columns="*,*" horizontalAlignment="center" @swipe="onSwipe($event)")
                  Image(src="res://default_profile" height="80%" row="0" colSpan="2")
                  Label(:text="job.test" row="1" col="0" width="100%")
                  Label(:text="job.test" row="1" col="1" width="100%")
                  Label(:text="job.test" row="2" col="0" width="100%")
                  Label(:text="job.test" row="2" col="1" width="100%")
          StackLayout(backgroundColor="#f6d624" height="10%" orientation="horizontal" padding="5")
            StackLayout(width="30%" backgroundColor="white")
              Image(src="res://thumb_down" height="90%" aspectFill="aspectFill")
            StackLayout(width="40%")
              Image(src="res://filter" height="90%" aspectFill="aspectFill")
            StackLayout(width="30%" backgroundColor="white")
              Image(src="res://thumb_up" height="90%" aspectFill="aspectFill")



</template>

<script lang="coffee">
  import _ from "lodash"
  import * as enums from 'ui/enums'
  export default
    props: ["details"]
    created: ->
      @mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
    data: ->
      jobs: [
        {test: "1"},
        {test: "2"},
        {test: "3"}
      ]
      mainContentText: ""
      isOpen: false
      welcome: "Welcome, #{@details.firstName}!"
      fullName: "#{@details.firstName} #{(@details.middleName).charAt(0)} #{@details.lastName}"
    methods:
      onSwipe: (e) ->
        console.log e.direction
        switch e.direction
          when 2
            # this.$refs.topCard.nativeView.animate({
            #   translate: {x: 100, y: 100},
            #   opacity: 0,
            #   duration: 500,
            #   curve: enums.AnimationCurve.easeIn
            # })
            @jobs = _.tail @jobs

      openDrawer: ->
        @isOpen = true
        @$refs.drawer.nativeView.showDrawer()
      onCloseDrawerTap: ->
        @isOpen = false
        @$refs.drawer.nativeView.closeDrawer()
</script>

<style lang="scss">

</style>
