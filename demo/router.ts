import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "./Home.vue";
import History from "./History.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            history: "Home",
        },
    },
    {
        path: "/history",
        name: "History",
        component: History,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
