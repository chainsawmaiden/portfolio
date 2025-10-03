import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'titleBlock',
  title: 'Title Block',
  type: 'object',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'titleMedia',
      title: 'Media (Optional)',
      description: 'Optional title block media',
      type: 'media',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'titleMedia.asset',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle,
        media: media[0] || media?.[0].asset,
      }
    },
  }
})