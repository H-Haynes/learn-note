<template>
 <div class="flex h-full">
   <my-nav></my-nav>
   <div class="flex-1">
     <router-link to="/home">HOME</router-link>
      <router-link to="/test">TEST</router-link>

      <router-view>

      </router-view>
   </div>
 </div>
  
</template>

<script>
import myNav from "./components/nav/index.vue"
export default {
  name: 'App',
  components:{
    myNav
  }
  
}
</script>
