/* eslint-disable ts/ban-ts-comment */
import { testClient } from 'hono/testing'
import { describe, expect, expectTypeOf, it } from 'vitest'
import createApp, { createTestApp } from '@/lib/create-app'
import router from './tasks.index'

describe('tasks list', () => {
  it('responds with an array of tasks', async () => {
    const testRouter = createTestApp(router)
    const response = await testRouter.request('/tasks')
    const result = await response.json()

    console.log(result)
    // @ts-expect-error
    expectTypeOf(result).toBeArray()
  })

  it('responds with an array of tasks client', async () => {
    const client = testClient(createApp().route('/', router))
    const response = await client.tasks.$get()

    const result = await response.json()
    expectTypeOf(result).toBeArray()
  })

  it('validates the body when creating a task', async () => {
    const client = testClient(createApp().route('/', router))
    const response = await client.tasks.$post({
      json: {
        name: 'Learn Hono',
      },
    })

    expect(response.status).toBe(422)
  })
})
