<template>
  <div>
    <h1 class="text-4xl mb-8">2020年各国GDP排行</h1>

    <div class="flex h-10 w-3/4 mx-auto">
      <Bar1 ></Bar1>
      <Bar2></Bar2>
    </div>

    <el-form inline size="small" class="mt-16">
      <el-form-item v-for="country in gdpRef" :key="country.id" :label="country.country+':'">
        <el-input type="number" class="w-32" v-model="country.gdp"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Bar1 from "./components/Bar1.vue"
import Bar2 from "./components/Bar2.vue"

import {defineComponent,ref} from "vue"
import axios from "axios"
export default defineComponent({
  components:{
    Bar1,
    Bar2
  },
  setup(){
      //获取数据,
      const gdpRef= ref([])
      async function getData(){
          gdpRef.value = await axios.get().then(res=>{

             return resp.json
           },err=>{
             //模拟数据
             return [
               {
                 country:'china',
                 gdp:12.6,
                 id:1
               },
               {
                 country:'amercian',
                 gdp:16.4,
                 id:2
               },
               {
                 country:'japan',
                 gdp:7.56,
                 id:3
               },
               {
                 country:'russia',
                 gdp:8.43,
                 id:4
               }
             ]
           })
      }
      getData()
      return {
        gdpRef,
        
      }
  }
})
</script>
