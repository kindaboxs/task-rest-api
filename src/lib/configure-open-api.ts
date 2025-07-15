import type { AppOpenAPI } from '@/types'

import { Scalar } from '@scalar/hono-api-reference'
import packageJSON from '../../package.json'

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Task Rest API',
    },
  })

  app.get(
    '/reference',
    Scalar({
      url: '/doc',
      theme: 'alternate',
      layout: 'modern',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
    }),
  )
}
