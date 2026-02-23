import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Production from '../views/Production.vue'
import Market from '../views/Market.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Dashboard },
        { path: '/production', component: Production },
        { path: '/market', component: Market }
    ]
})

export default router
