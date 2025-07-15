import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { env } from '@/utils/env'
import { INTERNAL_SERVER_ERROR, OK } from '@/utils/http-status-codes'

const onError: ErrorHandler = (err, c) => {
  const currentStatus = 'status' in err
    ? err.status
    : c.newResponse(null).status

  const statusCode = currentStatus !== OK
    ? currentStatus as ContentfulStatusCode
    : INTERNAL_SERVER_ERROR

  return c.json({
    message: err.message,
    stack: env.NODE_ENV === 'production' ? undefined : err.stack,
  }, statusCode)
}

export default onError
