import DashboardLayoutGerente from "@/layout/dashboard/DashboardLayoutGerente.vue";
import DashboardLayouFuncionario from "@/layout/dashboard/DashboardLayouFuncionario.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
// Admin pages
const ProfileFunPessoal = () => import(/* webpackChunkName: "dashboard" */"@/pages//Profile/EditFuncionarioPessoal.vue");
const ProfileFun = () => import(/* webpackChunkName: "dashboard" */"@/pages//Profile/EditFuncionario.vue");
const Funcionarios = () => import(/* webpackChunkName: "dashboard" */"@/pages/ListFun.vue");
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
      {
        path: '/funcionarios',
        name: 'Funcionarios',
        components: { default: Funcionarios }
      },      
      {
        path: '/editfun',
        name: 'Editar Funcionario',
        components: { default: ProfileFun }
      },
    ]
  },
  {
    path: '/funcionario',
    component: DashboardLayouFuncionario,
    redirect: '/realizarcompra',
    name: 'FUNCIONARIO PONTO DE VENDAS',
    children: [
      {
        path: '/realizarcompra',
        name: 'Realizar Compra',
        components: { default: ReCompra }
      },
      {
        path: '/informacao/pessoal',
        name: 'Informação',
        components: { default: ProfileFunPessoal}
      },
    ]
  },
  {
    path: '/gerente',
    component: DashboardLayouFuncionario,
    redirect: '/realizarcompra',
    name: 'FUNCIONARIO PONTO DE VENDAS',
    children: [
      {
        path: '/realizarcompra',
        name: 'Realizar Compra',
        components: { default: ReCompra }
      },
      {
        path: '/informacao/pessoal',
        name: 'Informação',
        components: { default: ProfileFunPessoal}
      },
    ]
  },
  { path: '*', component: NotFound }
];


export default routes;