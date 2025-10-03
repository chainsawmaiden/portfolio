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
      name: 'fullscreenMedia',
      title: 'Fullscreen Media (optional)',
      type: 'media',
    }),
    defineField({
      name: 'titleBlock',
      title: 'Title Block',
      type: 'titleBlock',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'media' },
        { type: 'galleryMediaDouble' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
      fullscreenMedia: 'fullscreenMedia.asset.0',
      
    },
    prepare({ title, content, fullscreenMedia }) {
      const contentCount = content?.length || 0
      return {
        title: title,
        subtitle: `${contentCount} section${contentCount !== 1 ? 's' : ''}`,
        media: fullscreenMedia?._type === 'image' ? fullscreenMedia : fullscreenMedia?.asset,
      }
    }
  }
})
