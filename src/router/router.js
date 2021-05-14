import { createRouter, createWebHistory } from "vue-router"
import index from '../views/index.vue'
import navbar from '../views/navbar.vue'
import register from '../views/register.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory('/Recipe-client/'),
  routes
});

export default router;