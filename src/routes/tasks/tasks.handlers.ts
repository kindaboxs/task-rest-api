import type { CreateRoute, ListRoute } from '@/routes/tasks/tasks.routes'
import type { AppRouteHandler } from '@/types'
import { db } from '@/db'
import { tasksTable } from '@/db/schemas/task'
import * as HttpStatusCodes from '@/utils/http-status-codes'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany()

  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')

  const [insertedTask] = await db.insert(tasksTable).values(task).returning()

  return c.json(insertedTask, HttpStatusCodes.OK)
}
