import { createRouter, createWebHistory } from "vue-router"
import index from '../views/index.vue'
import navbar from '../views/navbar.vue'
import register from '../views/register.vue'
import login from '../views/login.vue'
import userinfo from '../views/userinfo.vue'
import favourite from '../views/favourite.vue'

const routes = [
  {
    path: "/",
    components: {
      default: index,
      nav: navbar
    }
  },
  {
    path: "/register",
    components: {
      default: register,
      nav: navbar
    }
  },
  {
    path: "/login",
    components: {
      default: login,
      nav: navbar
    }
  },
  {
    path: "/logout",
    component: () => import('../views/logout.vue')
  },
  {
    path: "/userinfo",
    components: {
      default: userinfo,
      nav: navbar
    }
  },
  {
    path: "/favourite",
    components: {
      default: favourite,
      nav: navbar
    }
  }
]

const router = createRouter({
  history: createWebHistory('/Recipe-client/'),
  routes
});

export default router;