# pinia与vuex

## pinia

pinia是一个围绕vue3 composition API的封装器

### 安装

```yml
    npm i pinia@next
    # or
    yarn add pinia@next
```

### 使用

```js
    // in main.js
    import {createPinia} from 'pinia';
    import {createApp} from 'vue'
    const app = createApp();
    app.use(createPinia());
```

```js
    // store/a.js
    import {defineStore} from 'pinia';
    export default useAStore = defineStore({
        id:'a',
        state: () => ({
            x:27,
            y:28,
            z:29
        })
    });
```

### 访问

```html
    <!-- xxxcomp or xxxpage -->
    <template>
        {{a.x}}
    </template>
    <script setup>
        import useAStore from '@/store/a.js';
        const a = useAStore();
    </script>
```

## pinia VS vuex

`Pinia`试图尽可能地接近Vuex的理念。它的设计是为了测试Vuex的下一次迭代的建议，它是成功的，因为目前有一个开放的RFC，用于`Vuex 5`，其API与Pinia使用的非常相似。"我对这个项目的个人意图是重新设计使用全局Store的体验，同时保持Vue的平易近人的理念。我保持`Pinia`的API与`Vuex`一样接近，因为它不断向前发展，使人们很容易迁移到Vuex，甚至在未来融合两个项目（在Vuex下）"

### Pinia

优点

1. 完整的 TypeScript 支持：与在 Vuex 中添加 TypeScript 相比，添加 TypeScript 更容易
2. 极其轻巧（体积约 1KB）
3. store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数
4. 支持多个Store
5. 支持 Vue devtools、SSR 和 webpack 代码拆分

缺点

不支持时间旅行(time line)和编辑等调试功能

### vuex

优点

1. 支持调试功能
2. 适用于大型、高复杂度的Vue.js项目

缺点

1. 从 Vue 3 开始，getter 的结果不会像计算属性那样缓存
2. Vuex 4有一些与类型安全相关的问题
