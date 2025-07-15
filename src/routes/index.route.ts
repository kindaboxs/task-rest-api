import { createRoute } from '@hono/zod-openapi'
import { jsonContent } from 'stoker/openapi/helpers'
import { createMessageObjectSchema } from 'stoker/openapi/schemas'
import { createRouter } from '@/lib/create-app'
import * as HttpStatusCodes from '@/utils/http-status-codes'

const router = createRouter()
  .openapi(createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema('Task Rest API'),
        'Task Rest API index',
      ),
    },
  }), c => c.json({
    message: 'Task Rest API',
  }, HttpStatusCodes.OK))

export default router
