import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Untitled Gallery',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'galleryMediaGrid' },
        { type: 'textBlock' },
        { type: 'mediaCarousel' },
        { type: 'quote' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      const contentCount = content?.length || 0
      return {
        title: title,
        subtitle: `${contentCount} item${contentCount !== 1 ? 's' : ''}`,
      }
    }
  }
})