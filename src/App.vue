<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from "./Header";

  export default {
  name: "App",
  components: { Header } 
  };
</script>