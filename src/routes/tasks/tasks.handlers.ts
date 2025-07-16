import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute } from '@/routes/tasks/tasks.routes'
import type { AppRouteHandler } from '@/types'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { tasksTable } from '@/db/schemas/task'
import * as HttpStatusCodes from '@/utils/http-status-codes'
import * as HttpStatusPhrases from '@/utils/http-status-phrases'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany()

  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')

  const [insertedTask] = await db.insert(tasksTable).values(task).returning()

  return c.json(insertedTask, HttpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const task = await db.query.tasksTable.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
  })

  if (!task) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(task, HttpStatusCodes.OK)
}

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const update = c.req.valid('json')

  const [task] = await db.update(tasksTable)
    .set(update)
    .where(eq(tasksTable.id, id))
    .returning()

  if (!task) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(task, HttpStatusCodes.OK)
}
