import { createMessageObjectSchema } from 'stoker/openapi/schemas'
import * as HttpStatusPhrases from '@/utils/http-status-phrases'

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)
