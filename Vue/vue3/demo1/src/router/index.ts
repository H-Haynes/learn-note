
import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/test.vue"
import Test from "../views/home.vue"
const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/test",
        name: "test",
        component: Test
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router