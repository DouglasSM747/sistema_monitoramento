import DashboardLayoutGerente from "@/layout/dashboard/DashboardLayoutGerente.vue";
import DashboardLayouFuncionario from "@/layout/dashboard/DashboardLayouFuncionario.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Login = () => import(/* webpackChunkName: "dashboard" */"@/pages/Login.vue");
const ReCompra = () => import(/* webpackChunkName: "dashboard" */"@/pages/RealizarCompra.vue");
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
    path: '/',
    component: Login,
    name: 'Login'
  },
  {
    path: '/dono',
    component: DashboardLayoutGerente,
    redirect: '/compras',
    name: 'DONO PONTO DE VENDA',
    children: [
      {
        path: '/compras',
        name: 'Compras',
        components: { default: Compra }
      },
      {
        path: '/profile',
        name: 'Informacoes',
        components: { default: Profile }
      },
      {
        path: '/estoque',
        name: 'Estoque',
        components: { default: Estoque }
      },
      {
        path: '/produtos',
        name: 'Produtos Da Compra',
        components: { default: Produtos }
      },
    ]
  },
  {
    path: '/funcionario',
    component: DashboardLayoutGerente,
    redirect: '/realizarcompra',
    name: 'FUNCIONARIO PONTO DE VENDAS',
    children: [
      {
        path: '/realizarcompra',
        name: 'Realizar Compra',
        components: { default: ReCompra }
      },
    ]
  },
  { path: '*', component: NotFound }
];


export default routes;