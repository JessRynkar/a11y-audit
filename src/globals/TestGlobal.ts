import type { GlobalConfig } from 'payload'

export const TestGlobal: GlobalConfig = {
  slug: 'test-global',
  fields: [
    {
      name: 'testField',
      type: 'text',
      label: 'Test Field',
    },
  ],
}
