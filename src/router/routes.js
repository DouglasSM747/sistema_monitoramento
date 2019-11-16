import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Estoque = () => import(/* webpackChunkName: "dashboard" */"@/pages/Estoque.vue");
const Produtos = () => import(/* webpackChunkName: "dashboard" */"@/pages/Produtos.vue");
const Compra = () => import(/* webpackChunkName: "dashboard" */"@/pages/Compras.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/compras",
    children: [
      {
        path: "estoque",
        name: "estoque",
        component: Estoque
      },
      {
        path: "compras",
        name: "compras",
        component: Compra
      },
      {
        path: "produtos",
        name: "produtos",
        component: Produtos
      },
      {
        path: "profile",
        name: "informacao",
        component: Profile
      }
    ],
  },
  {
    path: "/funcionario",
    component: DashboardLayout,
    redirect: "/compras",
    children: [
      {
        path: "estoque",
        name: "estoque",
        component: Estoque
      },
      {
        path: "compras",
        name: "compras",
        component: Compra
      },
      {
        path: "produtos",
        name: "produtos",
        component: Produtos
      },
      {
        path: "profile",
        name: "informacao",
        component: Profile
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
