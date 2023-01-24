import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { 
      name: 'content',
      title: 'Content'
    },
    { 
      name: 'seo',
      title: 'SEO'
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured image',
      type: 'image',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'markdown',
      description: 'This is a markdown editor. For help, visit https://www.markdownguide.org/cheat-sheet/',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Page title for SEO purposes.',
      group: 'seo',
      validation: Rule => [
        Rule.required(),
        Rule.max(50).error('Too long. Google requires the title to be under 50 characters.')
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      description: 'Page title for SEO purposes.',
      rows: 2,
      group: 'seo',
      validation: Rule => [
        Rule.required(),
        Rule.max(155).error('Too long. Google requires the title to be under 155 characters.')
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
