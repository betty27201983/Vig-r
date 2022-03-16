import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/FrontBoard.vue'),
    meta: {
      title: 'Vigor'
    },
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
    component: () => import('../views/backend/Login.vue'),
    meta: {
      title: '使用者登入'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    meta: {
      title: '後台管理頁面'
    },
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

router.beforeEach((to, from, next) => {
  // beforeEach是router的鉤子函数，在進入路由前執行
  if (to.meta.title) {
    // 判斷是否有標題
    document.title = to.meta.title
  } else {
    document.title = 'Vigor'
  }
  next()
})

export default router
