import { defineConfig } from 'drizzle-kit'
import { env } from '@/utils/env'

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
