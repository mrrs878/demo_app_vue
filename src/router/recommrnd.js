const Recommend = () => import('@/views/recommend/Recommend')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  }
]

export default routes
