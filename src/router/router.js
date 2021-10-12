import { createRouter, createWebHistory } from 'vue-router'
import ExchangerPage from '../pages/ExchangerPage'
import StockPage from '../pages/StockPage'

const routes = [
  {
    path: '',
    component: ExchangerPage
  },
  {
    path: '/stock',
    component: StockPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
