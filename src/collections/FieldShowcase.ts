import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  LinkFeature,
  UploadFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FieldShowcase: CollectionConfig = {
  slug: 'field-showcase',
  labels: {
    singular: 'Field Showcase',
    plural: 'Field Showcase',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Base',
    description: 'Test collection covering every non-text field type in Payload.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },

    // ── Arrays and blocks ─────────────────────────────────────────
    {
      name: 'arrayField',
      label: 'Array',
      type: 'array',
      fields: [
        { name: 'text', type: 'text' },
        { name: 'date', type: 'date' },
        { name: 'richText', type: 'richText' },
        { name: 'relatedPage', label: 'Related Page', type: 'relationship', relationTo: 'pages' },
      ],
    },
    {
      name: 'blocksField',
      label: 'Blocks',
      type: 'blocks',
      blocks: [
        {
          slug: 'textBlock',
          labels: { singular: 'Text Block', plural: 'Text Blocks' },
          fields: [
            { name: 'heading', type: 'text' },
            { name: 'body', type: 'richText' },
            { name: 'date', type: 'date' },
            { name: 'relatedPage', type: 'relationship', relationTo: 'pages' },
          ],
        },
        {
          slug: 'imageBlock',
          labels: { singular: 'Image Block', plural: 'Image Blocks' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'caption', type: 'text' },
            { name: 'date', type: 'date' },
            { name: 'link', type: 'relationship', relationTo: 'pages' },
          ],
        },
      ],
    },

    // ── Checkbox ──────────────────────────────────────────────────
    {
      name: 'checkbox',
      label: 'Checkbox',
      type: 'checkbox',
    },

    // ── Collapsible ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Collapsible Group',
      admin: { initCollapsed: true },
      fields: [
        { name: 'collapsibleText', label: 'Text inside collapsible', type: 'text' },
        { name: 'collapsibleNumber', label: 'Number inside collapsible', type: 'number' },
      ],
    },

    // ── Date ──────────────────────────────────────────────────────
    {
      name: 'dateField',
      label: 'Date Picker',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },

    // ── Number ────────────────────────────────────────────────────
    {
      name: 'numberField',
      label: 'Number',
      type: 'number',
      min: 0,
      max: 100,
    },

    // ── Point ─────────────────────────────────────────────────────
    {
      name: 'pointField',
      label: 'Point (lat/lng)',
      type: 'point',
    },

    // ── Radio ─────────────────────────────────────────────────────
    {
      name: 'radioField',
      label: 'Radio Group',
      type: 'radio',
      options: [
        { label: 'Option A', value: 'a' },
        { label: 'Option B', value: 'b' },
        { label: 'Option C', value: 'c' },
      ],
    },

    // ── Rich Text ─────────────────────────────────────────────────
    {
      name: 'richText',
      label: 'Rich Text',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          LinkFeature({}),
          UploadFeature({
            collections: {
              media: { fields: [{ name: 'caption', type: 'text' }] },
            },
          }),
          BlocksFeature({
            blocks: [
              {
                slug: 'inlineCallout',
                fields: [{ name: 'text', type: 'text', required: true }],
              },
            ],
          }),
        ],
      }),
    },

    // ── Relationships ─────────────────────────────────────────────
    {
      name: 'relatedPage',
      label: 'Relationship (single)',
      type: 'relationship',
      relationTo: 'pages',
    },
    {
      name: 'relatedPages',
      label: 'Relationship (many)',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
    },
    {
      name: 'uploadField',
      label: 'Upload (media)',
      type: 'upload',
      relationTo: 'media',
    },

    // ── Tabs ──────────────────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tab One',
          fields: [
            { name: 'tabOneText', label: 'Text (Tab 1)', type: 'text' },
            { name: 'tabOneDate', label: 'Date (Tab 1)', type: 'date' },
          ],
        },
        {
          label: 'Tab Two',
          fields: [
            { name: 'tabTwoCheckbox', label: 'Checkbox (Tab 2)', type: 'checkbox' },
            {
              name: 'tabTwoRelation',
              label: 'Relationship (Tab 2)',
              type: 'relationship',
              relationTo: 'pages',
            },
          ],
        },
        {
          label: 'Tab Three',
          fields: [
            { name: 'tabThreeNumber', label: 'Number (Tab 3)', type: 'number' },
            {
              name: 'tabThreeSelect',
              label: 'Select (Tab 3)',
              type: 'select',
              options: [
                { label: 'X', value: 'x' },
                { label: 'Y', value: 'y' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
