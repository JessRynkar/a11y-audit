import type { CollectionConfig } from 'payload'

export const VersionedArticles: CollectionConfig = {
  slug: 'versioned-articles',
  trash: true,
  labels: {
    singular: 'Versioned Article',
    plural: 'Versioned Articles',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Base',
    defaultColumns: ['title', 'status', 'updatedAt'],
    description:
      'Drafts & publishing enabled — use this collection to test version history, save draft, publish, unpublish, restore, and compare.',
    livePreview: {
      url: ({ data, locale }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/preview/articles/${data?.id}?locale=${locale?.code ?? 'en'}`,
    },
  },
  versions: {
    drafts: {
      autosave: false,
    },
    maxPerDoc: 10,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
