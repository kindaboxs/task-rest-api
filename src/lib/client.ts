import type { AppType } from '@/app'
import { hc } from 'hono/client'

export const honoClient = hc<AppType>('http://localhost:9999/')
