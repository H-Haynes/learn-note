import { ref } from 'vue';
import todoStorage from "./util"

export default function (todoListRef) {
    const newTodoRef = ref("");
    function addTodo() {
        const task = newTodoRef.value && newTodoRef.value.trim();

        if (!task) return;
        if (todoListRef.value.find(ele => ele.task == task)) {
            newTodoRef.value = "";
            return alert('已存在相同的任务!')
        }
        const todo = {
            // id: Symbol(task),  //symbol不能存储
            id: todoStorage.generateRandomStr(),
            task,
            status: 0
        }
        console.log(todo)
        todoListRef.value.push(todo);
        newTodoRef.value = "";
    }
    return {
        newTodoRef,
        addTodo
    }
}