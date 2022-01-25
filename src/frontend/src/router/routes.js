export default [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "AppLayoutMain" },
  },
];
