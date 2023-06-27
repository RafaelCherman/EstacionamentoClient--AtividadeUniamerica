import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/marca',
    name: 'marca-lista',
    component: () => import('@/views/marca/MarcaListaView.vue')
  },
  {
    path: '/marcacadastra',
    name: 'marca-cadastra',
    component: () => import('@/views/marca/MarcaCadastraView.vue'),
    children: [
      {
        path: '/marcacadastra',
        name: 'marca-cadastra-editar',
        component: () => import('@/views/marca/MarcaCadastraView.vue')
      },
      {
        path: '/marcacadastra',
        name: 'marca-cadastra-deletar',
        component: () => import('@/views/marca/MarcaCadastraView.vue')
      }
    ]
  },
  {
    path: '/modelo',
    name: 'modelo-lista',
    component: () => import('@/views/modelo/ModeloListaView.vue')
  },
  {
    path: '/modelocadastra',
    name: 'modelo-cadastra',
    component: () => import('@/views/modelo/ModeloCadastraView.vue'),
    children: [
      {
        path: '/modelocadastra',
        name: 'modelo-cadastra-editar',
        component: () => import('@/views/modelo/ModeloCadastraView.vue')
      },
      {
        path: '/modelocadastra',
        name: 'modelo-cadastra-deletar',
        component: () => import('@/views/modelo/ModeloCadastraView.vue')
      }
    ]
  },
  {
    path: '/condutor',
    name: 'condutor-lista',
    component: () => import('@/views/condutor/CondutorListaView.vue')
  },
  {
    path: '/condutorcadastra',
    name: 'condutor-cadastra',
    component: () => import('@/views/condutor/CondutorCadastraView.vue'),
    children: [
      {
        path: '/condutorcadastra',
        name: 'condutor-cadastra-editar',
        component: () => import('@/views/condutor/CondutorCadastraView.vue')
      },
      {
        path: '/condutorcadastra',
        name: 'condutor-cadastra-deletar',
        component: () => import('@/views/condutor/CondutorCadastraView.vue')
      }
    ]
  },
  {
    path: '/veiculo',
    name: 'veiculo-lista',
    component: () => import('@/views/veiculo/VeiculoListaView.vue')
  },
  {
    path: '/veiculocadastra',
    name: 'veiculo-cadastra',
    component: () => import('@/views/veiculo/VeiculoCadastraView.vue'),
    children: [
      {
        path: '/veiculocadastra',
        name: 'veiculo-cadastra-editar',
        component: () => import('@/views/veiculo/VeiculoCadastraView.vue')
      },
      {
        path: '/veiculocadastra',
        name: 'veiculo-cadastra-deletar',
        component: () => import('@/views/veiculo/VeiculoCadastraView.vue')
      }
    ]
  },
  {
    path: '/movimentacao',
    name: 'movimentacao-lista',
    component: () => import('@/views/movimentacao/MovimentacaoListaView.vue')
  },
  {
    path: '/movimentacaocadastra',
    name: 'movimentacao-cadastra',
    component: () => import('@/views/movimentacao/MovimentacaoCadastraView.vue'),
    children: [
      {
        path: '/movimentacaocadastra',
        name: 'movimentacao-cadastra-editar',
        component: () => import('@/views/movimentacao/MovimentacaoCadastraView.vue')
      },
      {
        path: '/movimentacaocadastra',
        name: 'movimentacao-cadastra-deletar',
        component: () => import('@/views/movimentacao/MovimentacaoCadastraView.vue')
      }
    ]
  },
  {
    path: '/configuracao',
    name: 'configuracao-lista',
    component: () => import('@/views/configuracao/ConfiguracaoListaView.vue')
  },
  {
    path: '/configuracaocadastra',
    name: 'configuracao-cadastra',
    component: () => import('@/views/configuracao/ConfiguracaoCadastraView.vue'),
    children: [
      {
        path: '/configuracaocadastra',
        name: 'configuracao-cadastra-editar',
        component: () => import('@/views/configuracao/ConfiguracaoCadastraView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
