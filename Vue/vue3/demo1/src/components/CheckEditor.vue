<template>
	<div>
      <div class="checkbox" :class="{checked:isCheck}" @click="handleChecked"></div>
      <input type="text" :value="title" @input="handleInput"/>
	</div>
</template>
<script lang="ts">
export default {
    props:{
       isCheck:Boolean,
       title:String,
       titleModifiers:{  //自定义修饰符
          default:()=>({})
       }
    },
    setup(props,ctx){
       console.log(props.titleModifiers)
      const handleChecked = () => {
            ctx.emit('update:isCheck',!props.isCheck)
      }
      const handleInput = e => {

         let val = e.target.value;
         if(props.titleModifiers.trim){
            val = val.trim()
         }
         if(props.titleModifiers.max6){
            val = val.slice(0,6);
         }
         ctx.emit('update:title',val)
      }    
      return {
         handleChecked,
         handleInput
      }
    }
}
</script>

<style lang="less">
   input[type=text]{
      border:1px solid #f1f5fa;
      outline-color: #409eff;
      margin-left:10px;
   }
   .checkbox{
      width:12px;
      height:12px;
      display: inline-block;
      border:1px solid #409eff;
      border-radius:3px;
      cursor:pointer;
      &.checked{
         background:#409eff;
      }
   }
</style>
