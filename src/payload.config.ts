import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { VersionedArticles } from './collections/Articles'
import { FieldShowcase } from './collections/FieldShowcase'
import { Folders } from './collections/Folders'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Settings } from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    autoLogin: false,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      collections: ['versioned-articles'],
    },
  },
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Spanish', code: 'es' },
      { label: 'French', code: 'fr' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  collections: [Users, Media, Pages, Folders, VersionedArticles, FieldShowcase],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
  onInit: async (payload) => {
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'dev@payloadcms.com',
          password: 'test',
        },
      })
    }

    const existingPages = await payload.find({ collection: 'pages', limit: 1 })
    if (existingPages.totalDocs === 0) {
      const loremParagraph = (text: string) =>
        ({
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text,
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Home',
          content: loremParagraph(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          ),
        },
      })
      await payload.create({
        collection: 'pages',
        data: {
          title: 'About',
          content: loremParagraph(
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          ),
        },
      })
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Contact',
          content: loremParagraph(
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          ),
        },
      })
    }

    const existingFolders = await payload.find({ collection: 'folders', limit: 1 })
    if (existingFolders.totalDocs === 0) {
      const marketing = await payload.create({
        collection: 'folders',
        data: { name: 'Marketing' },
      })
      const engineering = await payload.create({
        collection: 'folders',
        data: { name: 'Engineering' },
      })
      // Sub-folders nested under Marketing
      await payload.create({
        collection: 'folders',
        data: { name: 'Campaigns', _h_folders: marketing.id },
      })
      await payload.create({
        collection: 'folders',
        data: { name: 'Brand Assets', _h_folders: marketing.id },
      })
      // Sub-folder nested under Engineering
      await payload.create({
        collection: 'folders',
        data: { name: 'Docs', _h_folders: engineering.id },
      })
    }
  },
})
