<template lang="pug">
  Page(class="page")
    ActionBar(:title="welcome" backgroundColor="#09cefd" color="white")
    Label(text="Hello")
    //- RadSideDrawer( ref="drawer")
    //-   StackLayout( ~drawerContent class="sideStackLayout")
    //-     StackLayout( class="sideTitleStackLayout")
    //-       Label( text="Navigation Menu")
    //-     StackLayout( class="sideStackLayout")
    //-       Label( text="Primary" class="sideLabel sideLightGrayLabel")
    //-       Label( text="Social" class="sideLabel")
    //-       Label( text="Promotions" class="sideLabel")
    //-       Label( text="Labels" class="sideLabel sideLightGrayLabel")
    //-       Label( text="Important" class="sideLabel")
    //-       Label( text="Starred" class="sideLabel")
    //-       Label( text="Sent Mail" class="sideLabel")
    //-       Label( text="Drafts" class="sideLabel")
    //-     Label( text="Close Drawer" color="lightgray" padding="10" style="horizontal-align: center" @tap="onCloseDrawerTap")
    //-   StackLayout( ~mainContent)
    //-     Label( textWrap="true")
    //-     Button( text="Open Drawer" @tap="openDrawer()")



</template>

<script lang="coffee">
  export default
    props: ["details"]
    data: ->
      welcome: "Welcome, #{@details.firstName}!"
</script>

<style lang="scss">

</style>
