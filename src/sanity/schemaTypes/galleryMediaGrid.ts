import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryMediaGrid',
  title: 'Gallery Media Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        { type: 'media' },
        { type: 'galleryMediaDouble' },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      media: 'media',
      firstAsset: 'media.0.asset.0',
    },
    prepare({ media, firstAsset }) {
      const itemCount = media?.length || 0
      return {
        title: 'Media Grid',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''}`,
        media: firstAsset?._type === 'image' ? firstAsset : firstAsset?.asset,
      }
    }
  }
})