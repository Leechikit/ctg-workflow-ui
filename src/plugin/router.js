import Vue from "vue";
import Router from "vue-router";
import Vuex from "vuex";
import Sync from "vuex-router-sync";

Vue.use(Vuex)
let rs = new Vuex.Store({
  state: {} // 把router的状态同步到state对象
});

export const router = new Router({
  base: '/',
  routes: [
    {
      path : '/render',
      component: () =>
        import ('../views/esview/render.vue')
    }
  ]
})

Sync.sync(rs, router, {
  moduleName: 'RouteModule'
})

export const routerStore = rs

/**
 * pages {array} 菜单
 */
export function initRouter(pages) {
  //esview的路由
  let routes = pages.map((page, index) => {
      const routeComponent = () =>
        import ('../view' + page.url + '.vue')
      return {
        path: page.url,
        component: routeComponent
      }
    }
  )
  router.addRoutes(routes)
}
