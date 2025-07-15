import type { AppBindings } from '@/types'
import { OpenAPIHono } from '@hono/zod-openapi'
import { defaultHook } from 'stoker/openapi'
import { logger, notFound, onError, serveEmojiFavicon } from '@/middlewares'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  })
}

export default function createApp() {
  const app = createRouter()
  app.use(serveEmojiFavicon('📋'))
  app.use(logger())

  app.notFound(notFound)
  app.onError(onError)

  return app
}
