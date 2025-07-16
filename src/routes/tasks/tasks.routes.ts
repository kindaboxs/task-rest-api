import { createRoute, z } from '@hono/zod-openapi'
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from 'stoker/openapi/schemas'
import { notFoundSchema } from '@/constants'
import * as HttpStatusCodes from '@/utils/http-status-codes'

export const list = createRoute({
  tags: ['Tasks'],
  method: 'get',
  path: '/tasks',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          done: z.boolean(),
          createdAt: z.date(),
          updatedAt: z.date(),
        }),
      ),
      'The list of Tasks',
    ),
  },
})

export const create = createRoute({
  tags: ['Tasks'],
  method: 'post',
  path: '/tasks',
  request: {
    body: jsonContentRequired(
      z.object({
        name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
        done: z.boolean(),
      }),
      'The Task to create',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        id: z.number(),
        name: z.string(),
        done: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      'The created Task',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(
        z.object({
          name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
          done: z.boolean(),
        }),
      ),
      'The validation error(s)',
    ),
  },
})

export const getOne = createRoute({
  tags: ['Tasks'],
  method: 'get',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({
        id: z.number(),
        name: z.string(),
        done: z.boolean(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      'The requested Task',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(
        IdParamsSchema,
      ),
      'Invalid id error',
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
