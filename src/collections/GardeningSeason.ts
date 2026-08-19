import type { CollectionConfig } from 'payload'

export const GardeningSeason: CollectionConfig = {
  slug: 'gardening-season',
  labels: {
    singular: 'Gardening Inventory',
    plural: 'Gardening Inventories',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Alt Nav Sessions',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'colorsGrown',
      type: 'array',
      label: 'Colors Grown',
      fields: [
        {
          name: 'color',
          type: 'text',
          label: 'Color',
        },
      ],
    },
    {
      name: 'content',
      type: 'blocks',
      label: 'Content',
      blocks: [
        {
          slug: 'textBlock',
          labels: {
            singular: 'Text Block',
            plural: 'Text Blocks',
          },
          fields: [
            {
              name: 'richText',
              type: 'richText',
            },
          ],
        },
      ],
    },
    {
      name: 'observationDate',
      type: 'date',
      label: 'Observation Date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'numberObserved',
      type: 'number',
      label: 'Number Observed',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'iWitnessedThisMyself',
      type: 'checkbox',
      label: 'I witnessed this myself',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'season',
      type: 'select',
      label: 'Season',
      options: [
        { label: 'In Season', value: 'inSeason' },
        { label: 'Out of Season', value: 'outOfSeason' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'visibility',
      type: 'radio',
      label: 'Visibility',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pageToDisplayOn',
      type: 'relationship',
      label: 'Page to Display On',
      relationTo: 'pages',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Image',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
