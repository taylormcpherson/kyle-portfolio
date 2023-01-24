import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
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
      name: 'slug',
      title: 'Slug',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 6,
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
      title: 'slug',
    },
  },
})
