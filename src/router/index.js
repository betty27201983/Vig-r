import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/FrontBoard.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: 'product/:productId',
        name: 'Product',
        component: () => import('../views/Product.vue')
      },
      {
        path: 'item',
        name: 'Item',
        component: () => import('../views/Item.vue')
      },
      {
        path: 'guide',
        name: 'Guide',
        component: () => import('../views/Guide.vue')
      },
      {
        path: 'favorite',
        name: 'Favorite',
        component: () => import('../views/Favorite.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: 'cartInfo',
        name: 'CartInfo',
        component: () => import('../views/CartInfo.vue')
      },
      {
        path: 'checkout/:orderId',
        name: 'Checkout',
        component: () => import('../views/Checkout.vue')
      },
      {
        path: 'checkoutSuccess/:orderId',
        name: 'CheckoutSuccess',
        component: () => import('../views/CheckoutSuccess.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/backend/Products.vue')
      },
      {
        path: 'orders',
        name: 'Order',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'coupons',
        name: 'Coupon',
        component: () => import('../views/backend/Coupons.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'Home'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
