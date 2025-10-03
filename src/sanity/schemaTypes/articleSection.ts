import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleSection',
  title: 'Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'articleMediaSingle' },
        { type: 'articleMediaDouble' },
        { type: 'textBlock' },

      ],
      validation: (Rule) => Rule.min(1),
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
  }
})