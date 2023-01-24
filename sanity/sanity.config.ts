import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { markdownSchema } from 'sanity-plugin-markdown'
import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'kyle-portfolio',
  projectId: '38t6rk2v',
  dataset: 'production',

  plugins: [deskTool(), markdownSchema(), media()],

  schema: {
    types: schemaTypes,
  },
})
