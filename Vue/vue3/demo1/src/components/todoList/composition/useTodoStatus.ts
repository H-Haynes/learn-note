export default function (todoListRef) {
    function changeTodoStatus(todo) {
        todo.status = Number(!todo);
    }
    return {
        changeTodoStatus,
    }
}