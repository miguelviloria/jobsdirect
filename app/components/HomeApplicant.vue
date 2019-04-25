<template lang="pug">
  Page(class="page")
    ActionBar(:title="welcome" backgroundColor="#09cefd" color="white")
      template(v-if = "!isOpen")
        ActionItem(@tap="openDrawer()" android.systemIcon="arrow_down_float" android.position="actionBar")
      template(v-else)
        ActionItem(@tap="onCloseDrawerTap()" android.systemIcon="arrow_up_float" android.position="actionBar")
    RadSideDrawer(ref="drawer" :drawerLocation="drawerLoc")
      StackLayout(~drawerContent class="sideStackLayout" backgroundColor="white" padding="5")
        template(v-if="drawerLoc == 'Left'")
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
        template(v-else backgroundColor="#f6d624")
          StackLayout(width="40%" @tap="closeFilter()")
            Image(src="res://filter" height="90%" aspectFill="aspectFill")

      StackLayout(~mainContent)
        StackLayout(justifyContent="center" height="100%")
          StackLayout(height="90%")
            //- create card component
            //- loop it, add details taken from firebase using props.
            //- absolute layout.
            //- swipe left, remove from array. right, chat.
            AbsoluteLayout(height="100%")
              StackLayout(horizontalAlignment="center" backgroundColor="white" height="90%" width="90%"
                left="20" top="20" borderRadius="30" borderColor="gray" borderWidth="1" padding="10")
                  GridLayout(rows="*,*,*,*" columns="*" horizontalAlignment="center" verticalAligment="middle")
                    Label(textWrap=true row="1" col="0") Seems like you reached the end of the list! Hit refresh so we can begin searching again.
                    Button(row="2" col="0" text="Refresh" backgroundColor="#09cefd" color="#01647c" horizontalAlignment="center" verticalAligment="middle" @tap="refreshList()")
              template(v-for="(job, idx) in jobs")
                StackLayout(ref="topCard" horizontalAlignment="center" backgroundColor="white" height="90%" width="90%"
                :left="cardPos(idx)" :top="cardPos(idx)" borderRadius="30" borderColor="gray" borderWidth="1" padding="10")
                  GridLayout(rows="*,*,*" columns="*,*" horizontalAlignment="center" @swipe="onSwipe($event.direction)")
                    Image(src="res://default_profile" height="80%" row="0" colSpan="2")
                    Label(:text="job.test" row="1" col="0" width="100%")
                    Label(:text="job.test" row="1" col="1" width="100%")
                    Label(:text="job.test" row="2" col="0" width="100%")
                    Label(:text="job.test" row="2" col="1" width="100%")

          StackLayout(backgroundColor="#f6d624" height="10%" orientation="horizontal" padding="5")
            StackLayout(width="30%" backgroundColor="white" @tap="onSwipe(2)")
              Image(src="res://thumb_down" height="90%" aspectFill="aspectFill")
            StackLayout(width="40%" @tap="openFilter()")
              Image(src="res://filter" height="90%" aspectFill="aspectFill")
            StackLayout(width="30%" backgroundColor="white" @tap="onSwipe(1)")
              Image(src="res://thumb_up" height="90%" aspectFill="aspectFill")


</template>

<script lang="coffee">
  import _ from "lodash"
  import * as enums from 'ui/enums'
  export default
    props: ["details"]
    data: ->
      jobs: [
        {test: "1"},
        {test: "2"},
        {test: "3"},
        {test: "4"},
        {test: "5"},
        {test: "6"},
        {test: "7"},
        {test: "8"},
        {test: "9"},
        {test: "10"},
        {test: "11"}
      ]
      filterVisible: false
      drawerLoc: "Left"
      areaItems: [
        'Abra',
        "Batangas",
        "Calamba",
        "Davao"
      ]
      isOpen: false
      welcome: "Welcome, #{@details.firstName}!"
      fullName: "#{@details.firstName} #{(@details.middleName).charAt(0)} #{@details.lastName}"
    methods:
      refreshList: ->
        @jobs = [
          {test: "1"},
          {test: "2"},
          {test: "3"},
          {test: "4"},
          {test: "5"},
          {test: "6"},
          {test: "7"},
          {test: "8"},
          {test: "9"},
          {test: "10"},
          {test: "11"}
        ]
      cardPos: (d) ->
        switch d
          when 0 then 20
          when 1 then 18
          else 16

      onSwipe: (e) ->
        try
          switch e
            when 2 #LEFT
              await @$refs.topCard[@jobs.length-1].nativeView.animate({
                translate: {x: -100, y: 10},
                opacity: 0,
                duration: 250
              })
              @jobs.pop()
            when 1 #RIGHT
              await @$refs.topCard[@jobs.length-1].nativeView.animate({
                translate: {x: 100, y: -10},
                opacity: 0,
                duration: 250
              })
              @jobs.pop()
        catch e
          console.error e

      openFilter: ->
        await @drawerLoc = "Bottom"
        @isOpen = true
        @$refs.drawer.nativeView.showDrawer()

      closeFilter: ->
        @isOpen = false
        @$refs.drawer.nativeView.closeDrawer()

      openDrawer: ->
        await @drawerLoc = "Left"
        @isOpen = true
        @$refs.drawer.nativeView.showDrawer()
      onCloseDrawerTap: ->
        @isOpen = false
        @$refs.drawer.nativeView.closeDrawer()
</script>

<style lang="scss">

</style>
