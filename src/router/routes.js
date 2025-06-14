const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "home", component: () => import('src/pages/IndexPage.vue') },
      { path: '/cadastro', name: "cadastro", component: () => import('src/pages/CadastroPage.vue') },
      { path: '/sign-in', name: "signin", component: () => import('src/pages/SignIn.vue') },
      { path: '/alunos', name: "alunos", component: () => import('src/pages/AlunosPage.vue') },
      { path: '/form-aluno/:id?', name: "formAluno", component: () => import('src/pages/FormAluno.vue') },
      { path: '/professores', name: "professores", component: () => import('src/pages/ProfessoresPage.vue') },
      { path: '/form-professor/:id?', name: "formProfessor", component: () => import('src/pages/FormProfessor.vue') }
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
