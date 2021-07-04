export default function (todoListRef) {
    function delTodo(todo) {
        console.log(todo.id)
        let index = todoListRef.value.findIndex(ele => ele.id == todo.id);
        console.log(index);
        if (index != -1) {
            todoListRef.value.splice(index, 1)
        }
    }
    return {
        delTodo
    }
}