const Player = () => import('@/views/player/Player')

const routes = [
  {
    path: '/player/:id',
    component: Player
  }
]

export default routes
