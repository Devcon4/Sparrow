import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  console.log(window['Trello']);
  if(!window['Trello'].authorized()) {
    window['Trello'].authorize({
      name: 'Sparrow',
      persist: true
    });
  } 

  next();
});

export default router;


