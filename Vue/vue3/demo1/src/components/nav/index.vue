<template lang="">
    <div class="nav  w-32 lg:w-48 xl:w-48 2xl:w-48 bg-purple-500">

<el-menu default-active="1-4-1" class="el-menu-vertical-demo bg-purple-500"  :collapse="isCollapse">
  <el-submenu index="1">
    <template #title>
      <i class="el-icon-location"></i>
      <span>导航一</span>
    </template>
    <el-menu-item-group>
      <template #title>分组一</template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="分组2">
      <el-menu-item index="1-3">选项3</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <template #title>选项4</template>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <template #title>导航二</template>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <template #title>导航三</template>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <template #title>导航四</template>
  </el-menu-item>
</el-menu>

    </div>
</template>
<script>
import { ref,onMounted,nextTick, watch } from "vue";

export default {
  setup(props) {
    const isCollapseRef = ref(false);
    const watchWindow = () =>{
            const clientWidth = document.documentElement.clientWidth;
            if(clientWidth > 750){
                isCollapseRef.value = true;
            }else{
                isCollapseRef.value = false;
            }
    }
    onMounted(async()=>{
        watchWindow();
        await nextTick(()=>{
            window.onresize =function(){ 
                console.log(12312)
                watchWindow();
            }
            
        })
    })
    return {
        isCollapseRef,
    };
  },
};
</script>
<style lang="less" scoped>
</style>