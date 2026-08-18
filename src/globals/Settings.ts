import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'My Site',
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      defaultValue: 'A short description of the site.',
    },
  ],
}
