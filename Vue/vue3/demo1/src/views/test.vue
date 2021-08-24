<template lang="">
    <div>
        www12312312666660990
		<Check-editor 
				v-model:isCheck= "isCheck"
				@update:isCheck= "isCheck = $event"
				@update:title= "name= $event"
				v-model:title.trim.max6= "name"
				>
		</Check-editor>

		<p>选中状态:{{isCheck}}</p>
		<p>名字:{{name}}</p>
    </div>
</template>
<script>
import CheckEditor from "../components/CheckEditor.vue"
export default {
	components:{
	   CheckEditor	   
	},
	data(){
		return {
			isCheck:false,
			name:"华为"
		}
	}

}
</script>
<style lang="">
   
</style>
