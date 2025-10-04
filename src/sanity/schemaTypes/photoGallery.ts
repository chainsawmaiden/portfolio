import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photoGallery',
  title: 'photoGallery',
  type: 'document',
  fields: [
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        { type: 'media' }
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
        title: 'Photo Gallery',
        subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''}`,
        media: firstAsset?._type === 'image' ? firstAsset : firstAsset?.asset,
      }
    }
  }
})