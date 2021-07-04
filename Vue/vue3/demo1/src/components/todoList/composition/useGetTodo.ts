import { computed, ref, watchEffect } from "vue"
import todoStorage from "./util"

export default function () {
    const todoListRef = ref(todoStorage.get());
    watchEffect(() => {
        console.log('update')
        todoStorage.set(todoListRef.value)
    })

    const finishTodoNum = computed(() => {
        return todoListRef.value.filter(ele => ele.status == 1).length;
    })

    return {
        todoListRef,
        finishTodoNum
    }
}