import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '@/db/schemas/task'

import { env } from '@/utils/env'

const queryClient = postgres(env.DATABASE_URL)
export const db = drizzle({ client: queryClient, schema })
