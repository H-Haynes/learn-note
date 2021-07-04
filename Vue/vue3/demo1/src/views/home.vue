<template lang="">
    <div>
       <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Hello Vue 3.0 + Vite" />
    </div>
    9999999
    <todo-list></todo-list>
</template>
<script>
import HelloWorld from '../components/HelloWorld.vue'
import todoList from "../components/todoList/index.vue"
export default {
    components: {
        HelloWorld,
        todoList
    }
}
</script>
<style lang="">
    
</style>