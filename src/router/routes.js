const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "home", component: () => import('src/pages/IndexPage.vue') },
      { path: '/alunos', name: "alunos", component: () => import('src/pages/AlunosPage.vue') },
      { path: '/form-aluno/:id?', name: "formAluno", component: () => import('src/pages/FormAluno.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
