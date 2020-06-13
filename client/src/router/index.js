import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import SignIn from "../views/SignIn.vue"
import NotFound from "@/views/NotFound"
import api from "@/services/ApiService"
import store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/*",
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters["users/getIsLoggedIn"]) {
      next()
    } else {
      api.post("auth").then(() => {
        store.dispatch("users/login")
        next()
      })
    }
  } else {
    next()
  }
})

export default router
