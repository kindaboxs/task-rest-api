import type { ListRoute } from '@/routes/tasks/tasks.routes'
import type { AppRouteHandler } from '@/types'

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([{
    name: 'Learn Hono',
    done: false,
  }])
}
