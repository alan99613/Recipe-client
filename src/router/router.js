import { createRouter, createWebHistory } from "vue-router"
import index from '../views/index.vue'

const routes = [
  {
    path: "/",
    components: {
      default: index
    }
  }
]

const router = createRouter({
  history: createWebHistory('/Recipe-client/'),
  routes
});

export default router;