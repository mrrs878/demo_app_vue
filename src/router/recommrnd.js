const Recommend = () => import('@/views/recommend/Recommend')
const ResourceDetail = () => import('@/views/recommend/ResourceDetail')

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/resourceDetail/:id',
    component: ResourceDetail
  }
]

export default routes
