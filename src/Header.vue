
<template>
  <nav>
    <ul>
      <li><router-link to='Home' exact>Home</router-link></li>
      <li><router-link to='About' exact>About</router-link></li>
    </ul>
  </nav>
</template>

<script>
//import Home from "./Home.vue";
//import About from "./About.vue";

  export default{
   name: "Header"
  };
</script>


<style scoped>
ul{
  list-style-type: none;
  text-align: right;
  margin: 0;
}
li{
  display:inline-block;
  margin:0 10px;
}
a{
  color:white;
  text-decoration:white;
  padding:6px 8px;
  border-radius: 10px;
}
nav{
  background:teal;
  padding:14px 0;
}
.router-link-active{
  background: #eee;
  color:#444;
}
</style>