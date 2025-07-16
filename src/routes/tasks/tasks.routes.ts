import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import * as HttpStatusCodes from '@/utils/http-status-codes'

const listSchema = z.array(z.object({
  name: z.string(),
  done: z.boolean(),
}))

export const list = createRoute({
  tags: ['Tasks'],
  method: 'get',
  path: '/tasks',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(listSchema, 'The list of Tasks'),
  },
})

export type ListRoute = typeof list
