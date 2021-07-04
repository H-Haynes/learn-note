<template>
  <div class="todo-list border mx-auto shadow-md rounded mb-32">
    <input
      @keyup.enter="addTodo"
      @blur="addTodo"
      v-model="newTodoRef"
      class="h-12 w-full text-center outline-none border-b"
      placeholder="What You Will Do ?"
    />
    <ul v-if="filteredList.length > 0">
      <li
        class="h-10 leading-10 border-b flex items-center px-3 hover:bg-purple-100 truncate"
        v-for="todo in filteredList"
        :key="todo.id"
      >
        <label>
          <i
            class="icon iconweixuanzhong text-2xl text-gray-400 cursor-pointer mr-5"
            :class="{ 'iconxuanzhong text-green-500': todo.status }"
          ></i>
          <input class="w-8 hidden" type="checkbox" v-model="todo.status" />
        </label>
        <span
          class="flex-1 truncate"
          :class="{
            'line-through text-gray-400': todo.status,
            'text-red-400': !todo.status,
          }"
          >{{ todo.task }}</span
        >
        <i
          @click="delTodo(todo)"
          class="icon iconguanbicuowu text-xl text-gray-300 cursor-pointer hover:text-gray-500"
        ></i>
      </li>
    </ul>

    <div class="empty py-8" v-else>
      <i class="icon iconmeiyoushuju text-gray-400 text-4xl"></i>
      <p class="mt-5 text-xs text-gray-400">没有数据</p>
    </div>

    <div class="flex justify-between mb-2 pt-3 px-3">
      <span
        >{{ finishTodoNum }} item{{
          finishTodoNum == 1 ? "" : "s"
        }}
        compeleted</span
      >
      <ul class="flex">
        <li
          class="mr-3 px-3 py-1 cusror-pointer hover:text-blue-300"
          :class="{ 'border rounded': statusFilterRef == 'all' }"
        >
          <a href="#/all">all</a>
        </li>
        <li
          class="mr-3 px-3 py-1 cusror-pointer hover:text-blue-300"
          :class="{ 'border rounded': statusFilterRef == 'running' }"
        >
          <a href="#/running">running</a>
        </li>
        <li
          class="mr-3 px-3 py-1 cusror-pointer hover:text-blue-300"
          :class="{ 'border rounded': statusFilterRef == 'done' }"
        >
          <a href="#/done">done</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import useGetTodo from "./composition/useGetTodo";
import useAddTodo from "./composition/useAddTodo";
import useDelTodo from "./composition/useDelTodo";
import useTodoStatus from "./composition/useTodoStatus";
import useFilter from "./composition/useFilter";
export default {
  setup() {
    const { todoListRef, finishTodoNum } = useGetTodo();
    return {
      todoListRef,
      finishTodoNum,
      ...useAddTodo(todoListRef),
      ...useDelTodo(todoListRef),
      ...useTodoStatus(todoListRef),
      ...useFilter(todoListRef),
    };
  },
};
</script>
<style  scoped>
.todo-list {
  width: 600px;
}
</style>