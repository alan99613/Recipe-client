import { createRouter, createWebHistory } from "vue-router"
import index from '../views/index.vue'
import navbar from '../views/navbar.vue'

const routes = [
  {
    path: "/",
    components: {
      default: index,
      nav: navbar
    }
  }
]

const router = createRouter({
  history: createWebHistory('/Recipe-client/'),
  routes
});

export default router;